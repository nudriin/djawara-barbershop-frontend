import AdminLayout from "../../components/AdminLayout";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Order() {
    const [orders, setOrders] = useState([]);
    const { curAdmin } = useSelector((state) => state.admin);
    const statusRef = useRef(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pendingClass = "bg-yellow-400 text-slate-900 px-2 rounded-full";
    const confirmedClass = "bg-green-400 text-slate-900 px-2 rounded-full";

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value});
        console.log(formData);
    }

    const handleStatus = async (id) => {
        try {
            const { isConfirmed } = await swal.fire({
                title: "Anda yakin?",
                text: "Anda akan mengubah status pesanan ini",
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
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (!data.errors) {
                    console.log(data);
                    swal.fire({
                        title: "Success",
                        text: "Status berhasil diubah!",
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
    };

    useEffect(() => {
        const getAllOrdersByAccountId = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch(`/api/v1/orders`, {
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
    }, [dispatch, curAdmin, orders])

    return (
        <AdminLayout>
            <div className="flex justify-center text-white">
                {orders.length === 0 || !orders.some((value) => value.status === "PENDING" || value.status === "CONFIRMED") ? (
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className="text-4xl text-white font-futura mb-6">Pesanan</h1>
                        <img className="w-2/4 h-full" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                    </div>
                ) : (
                    <table className="text-sm">
                        <thead className="bg-lime text-slate-900">
                            <tr>
                                <th className="px-2">ID</th>
                                <th className="px-2">User</th>
                                <th className="px-2">Kapster</th>
                                <th className="px-2">Kategori</th>
                                <th className="px-2">Jadwal</th>
                                <th className="px-2">Harga</th>
                                <th className="px-2">Waktu Order</th>
                                <th className="px-2">Status</th>
                                <th className="px-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="border border-lime">
                            {orders.map((value, index) => (
                                (value.status === "PENDING" || value.status === "CONFIRMED") &&
                                <tr key={index}>
                                    <td className="px-2 py-3">{value.id}</td>
                                    <td className="px-2 py-3">{value.account_name}</td>
                                    <td className="px-2 py-3">{value.kapster_name}</td>
                                    <td className="px-2 py-3">{value.category_name}</td>
                                    <td className="px-2 py-3">{value.schedule_date}</td>
                                    <td className="px-2 py-3">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value.total_price)}</td>
                                    <td className="px-2 py-3">{value.order_date}</td>
                                    <td className="px-2 py-3">
                                        <select onChange={handleChange} ref={statusRef} name="status" id="status" className={value.status == "PENDING" ? pendingClass : confirmedClass}>
                                            <option disabled selected value="">{value.status}</option>
                                            <option value="PENDING">PENDING</option>
                                            <option value="CONFIRMED">CONFIRMED</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="CANCELED">CANCELED</option>
                                        </select>
                                    </td>
                                    <td>
                                    <button onClick={() => handleStatus(value.id)} className="bg-lime px-2 text-slate-900 rounded-full">Ubah</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    )
}
