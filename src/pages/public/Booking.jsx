import { useEffect, useState } from "react";
import PublicLayout from "../../components/PublicLayout";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";

export default function Booking() {
    const [schedules, setSchedules] = useState([]);
    const { curAdmin } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllSchedules = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch('/api/v1/schedules', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (!data.errors) {
                    dispatch(buttonFinish());
                    setSchedules(data?.data);
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

        if (schedules.length === 0) {
            getAllSchedules();
        }
    });

    return (
        <PublicLayout>
            <section className="flex items-center justify-center min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border bg-slate-900 rounded-xl border-lime">
                    <h1 className="pt-8 text-4xl text-center font-futura">Book a <span className="text-lime">seat</span></h1>
                    <form className="grid items-center justify-center grid-cols-12 gap-4 pt-8 text-white">
                        <div className="col-span-6">
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="text" id="email" disabled defaultValue={curAdmin?.data?.email} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="phone" className="text-white">Phone</label>
                            <input type="text" id="phone" disabled defaultValue={curAdmin?.data?.phone} className="w-full p-2 border rounded-lg bg-slate-800 border-lime" />
                        </div>
                        <div className="col-span-6">
                            <input type="text" id="account_id" hidden defaultValue={curAdmin?.data?.id} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="username" className="text-white">Username</label>
                            <input type="text" id="username" disabled defaultValue={curAdmin?.data?.username} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="name" className="text-white">Name</label>
                            <input type="text" id="name" disabled defaultValue={curAdmin?.data?.name} className="w-full p-2 border rounded-lg bg-slate-800 border-lime" />
                        </div>
                        <label htmlFor="kapsters" className="text-white">Jadwal</label>
                        <select id="kapsters" className="w-full col-span-12 p-2 border rounded-lg cursor-pointer bg-slate-800 border-lime">
                            {schedules.map((value, index) => (
                                value.status != "BOOKED" ?  <option className="cursor-pointer" value={value.schedule_id} key={index}>
                                    <ul>
                                        <li> {value.kapster_name} | </li>
                                        <li> {value.category_name} | </li>
                                        <li> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value.category_price)} | </li>
                                        <li> {value.dates} | </li>
                                        <li> {value.times} WIB</li>
                                    </ul>
                                </option> : <option key={index} hidden></option>
                            ))}
                        </select>
                        <label className="w-full col-span-12 p-2 mt-4 text-center rounded-lg cursor-pointer bg-lime text-slate-900 hover:bg-purple hover:text-white">Book now</label>
                    </form>
                </div>
            </section>
        </PublicLayout>
    )
}
