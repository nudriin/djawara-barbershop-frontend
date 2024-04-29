import { useCallback, useEffect, useState } from "react";
import UserLayout from "../../components/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UserOrder() {
    const [orders, setOrders] = useState([]);
    const [candelId, setCancelId] = useState(null);
    const { curAdmin } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pendingClass = "bg-yellow-400 text-slate-900 px-2 rounded-full";
    const confirmedClass = "bg-green-400 text-slate-900 px-2 rounded-full";

    const handleCancel = useCallback(async (id) => {
        try {
            const { isConfirmed } = await swal.fire({
                title: "Anda yakin?",
                text: "Anda akan membatalkan pesanan ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7E30E1",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                customClass: 'bg-slate-900 text-lime rounded-xl'
            });
            if (isConfirmed) {
                dispatch(buttonStart());
                const response = await fetch(`/api/v1/orders/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: "CANCELED"
                    })
                });

                const data = await response.json();

                if (!data.errors) {
                    console.log(data);
                    swal.fire({
                        title: "Success",
                        text: "Pesanan berhasil dibatalkan!",
                        icon: "success",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    dispatch(buttonFinish());
                    // Refresh page
                    navigate(0);
                } else {
                    console.log(data);
                    swal.fire({
                        title: "Error",
                        text: data.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    dispatch(buttonFailed(data.errors));
                    throw new Error(data.errors);
                }
            }
        } catch (e) {
            console.log(e);
            dispatch(buttonFinish());
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        const getAllOrdersByAccountId = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch(`/api/v1/orders/account/${curAdmin?.data?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (!data.errors) {
                    dispatch(buttonFinish());
                    setOrders(data?.data);
                } else {
                    dispatch(buttonFailed(data.errors));
                    swal.fire({
                        title: "Error",
                        text: data.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    throw new Error(data.errors);
                }
            } catch (e) {
                dispatch(buttonFinish());
            }
        }

        if (orders.length === 0) {
            getAllOrdersByAccountId();
        }

        if (candelId) {
            handleCancel(candelId);
        }
    }, [dispatch, curAdmin, orders, candelId, handleCancel])

    return (
        <UserLayout>
            <div className="flex justify-center text-white">
                {orders.length === 0 || !orders.some((value) => value.status === "PENDING" || value.status === "CONFIRMED") ? (
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className="text-4xl text-white font-futura mb-6">Pesanan</h1>
                        <img className="w-2/4 h-full" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                    </div>
                ) : (
                    <table>
                        <thead className="bg-lime text-slate-900">
                            <tr>
                                <th className="px-2">ID</th>
                                <th className="px-2">Kapster</th>
                                <th className="px-2">Kategori</th>
                                <th className="px-2">Waktu</th>
                                <th className="px-2">Harga</th>
                                <th className="px-2">Status</th>
                                <th className="px-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="border border-lime">
                            {orders.map((value, index) => (
                                (value.status === "PENDING" || value.status === "CONFIRMED") &&
                                <tr key={index}>
                                    <td className="px-2 py-3">{value.id}</td>
                                    <td className="px-2 py-3">{value.kapster_name}</td>
                                    <td className="px-2 py-3">{value.category_name}</td>
                                    <td className="px-2 py-3">{value.schedule_date}</td>
                                    <td className="px-2 py-3">{value.total_price}</td>
                                    <td className="px-2 py-3"><span className={value.status == "PENDING" ? pendingClass : confirmedClass}>{value.status}</span></td>
                                    <td className="px-2 py-3">
                                        <button onClick={() => setCancelId(value.id)} className="bg-red-500 px-2 rounded-full">Batal</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </UserLayout>
    )
}
