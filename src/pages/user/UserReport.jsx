import UserLayout from "../../components/UserLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";

export default function UserReport() {
    const [orders, setOrders] = useState([]);
    const { curAdmin } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const completedClass = "bg-green-400 text-slate-900 px-2 rounded-full";
    const canceledClass = "bg-red-400 text-slate-900 px-2 rounded-full";

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

    }, [dispatch, curAdmin, orders])

    return (
        <UserLayout>
            <div className="flex justify-center text-white">
                {orders.length === 0 || !orders.some((value) => value.status === "COMPLETED" || value.status === "CANCELED") ? (
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className="text-4xl text-white font-futura mb-6">Riwayat</h1>
                        <img className="w-2/4 h-full" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                    </div>
                ) : (
                    <table>
                        <thead className="bg-lime text-slate-900">
                            <tr>
                                <th className="px-2">ID</th>
                                <th className="px-2">Kapster</th>
                                <th className="px-2">Kategori</th>
                                <th className="px-2">Jadwal</th>
                                <th className="px-2">Harga</th>
                                <th className="px-2">Waktu Order</th>
                                <th className="px-2">Status</th>
                            </tr>
                        </thead>
                        <tbody className="border border-lime">
                            {orders.map((value, index) => (
                                (value.status === "COMPLETED" || value.status === "CANCELED") &&
                                <tr key={index}>
                                    <td className="px-2 py-3">{value.id}</td>
                                    <td className="px-2 py-3">{value.kapster_name}</td>
                                    <td className="px-2 py-3">{value.category_name}</td>
                                    <td className="px-2 py-3">{value.schedule_date}</td>
                                    <td className="px-2 py-3">{new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(value.total_price)}</td>
                                    <td className="px-2 py-3">{value.order_date}</td>
                                    <td className="px-2 py-3"><span className={value.status == "COMPLETED" ? completedClass : canceledClass}>{value.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </UserLayout>
    )
}
