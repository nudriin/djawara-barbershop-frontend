import { useEffect, useState } from "react";
import PublicLayout from "../../components/PublicLayout";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Booking() {
    // const [schedules, setSchedules] = useState([]);
    // const scheduleRef = useRef(null);
    const { curAdmin, loading } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [kapsters, setKapsters] = useState([]);
    const [formData, setFormData] = useState({});
    // const [schedule, setSchedule] = useState({});
    const { token } = useSelector((state) => state.admin);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch('/api/v1/categories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                if (!data.errors) {
                    setCategories(data.data);
                    dispatch(buttonFinish());
                } else {
                    dispatch(buttonFailed(data.errors));
                    throw new Error(data.errors);
                }
            } catch (e) {
                console.log(e);
                dispatch(buttonFinish());
            }
        }

        const getAllKapsters = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch('/api/v1/kapsters', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                if (!data.errors) {
                    setKapsters(data.data);
                    dispatch(buttonFinish());
                } else {
                    dispatch(buttonFailed(data.errors));
                    throw new Error(data.errors);
                }
            } catch (e) {
                console.log(e);
                dispatch(buttonFinish());
            }

        }
        getAllKapsters();
        getAllCategories();
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log(formData);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const { isConfirmed } = await swal.fire({
                title: "Anda yakin?",
                text: "Anda akan melakukan pemesanan",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7E30E1",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
                customClass: 'bg-slate-900 text-lime rounded-xl'
            });
            if (isConfirmed) {
                let sid;
                dispatch(buttonStart());
                const scheduleResponse = await fetch('/api/v1/schedules', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.token}`
                    },
                    body: JSON.stringify(formData)
                });

                const scheduleData = await scheduleResponse.json();

                if (scheduleData.data) {
                    sid = scheduleData.data.id;
                    console.log(scheduleData);
                    console.log(sid);
                    dispatch(buttonFinish());
                } else {
                    dispatch(buttonFailed(scheduleData.errors));
                    swal.fire({
                        title: "Error",
                        text: scheduleData.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    throw new Error(scheduleData.errors);
                }

                if (!loading) {
                    dispatch(buttonStart());
                    const response = await fetch('/api/v1/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            account_id: curAdmin?.data?.id,
                            schedule_id: sid
                        })
                    });

                    const data = await response.json();
                    if (!data.errors) {
                        dispatch(buttonFinish());
                        swal.fire({
                            title: "Success",
                            text: "Booking berhasil!",
                            icon: "success",
                            customClass: 'bg-slate-900 text-lime rounded-xl'
                        });
                        navigate('/booking');
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
                }
            }
        } catch (e) {
            dispatch(buttonFinish());
        }
    }

    return (
        <PublicLayout>
            <section className="flex items-center justify-center min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border bg-slate-900 rounded-xl border-lime">
                    <h1 className="pt-8 text-4xl text-center font-futura">Book a <span className="text-lime">seat</span></h1>
                    <form className="grid items-center justify-center grid-cols-12 gap-4 pt-8 text-white">
                        <div className="col-span-6">
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="text" id="email" disabled defaultValue={curAdmin?.data?.email} className="w-full p-2 mb-4 border rounded-lg bg-slate-700 border-lime" />
                            <label htmlFor="phone" className="text-white">Phone</label>
                            <input type="text" id="phone" disabled defaultValue={curAdmin?.data?.phone} className="w-full p-2 border rounded-lg bg-slate-700 border-lime" />
                        </div>
                        <div className="col-span-6">
                            <input type="text" id="account_id" hidden defaultValue={curAdmin?.data?.id} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" />
                            <label htmlFor="username" className="text-white">Username</label>
                            <input type="text" id="username" disabled defaultValue={curAdmin?.data?.username} className="w-full p-2 mb-4 border rounded-lg bg-slate-700 border-lime" />
                            <label htmlFor="name" className="text-white">Name</label>
                            <input type="text" id="name" disabled defaultValue={curAdmin?.data?.name} className="w-full p-2 border rounded-lg bg-slate-700 border-lime" />
                        </div>
                        <div className="col-span-12">
                            <label htmlFor="kapster_id" className="text-white">Kapster</label>
                            <select name="kapster_id" id="kapster_id" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0">
                                <option value="" selected disabled>Pilih Kapster</option>
                                {kapsters.map((value, index) => (
                                    <option key={index} value={value.id} >{value.name}</option>
                                ))}
                            </select>
                            <label htmlFor="category_id" className="text-white">Kategori</label>
                            <select name="category_id" id="category_id" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0">
                                <option value="" selected disabled>Pilih Kategori</option>
                                {categories.map((value, index) => (
                                    <option key={index} value={value.id} >{value.name}</option>
                                ))}
                            </select>
                            <label htmlFor="dates" className="text-white">Tanggal</label>
                            <input type="date" name="dates" id="dates" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <label htmlFor="times" className="text-white">Jam</label>
                            <input type="time" name="times" id="times" onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            {/* <button onClick={handleUpload} className="w-full p-2 mb-4 rounded-lg bg-lime text-slate-900 hover:bg-purple hover:text-white">Tambah</button> */}
                            <div className="flex justify-center gap-1 text-sm">
                            </div>
                        </div>

                        {/* <label htmlFor="kapsters" className="text-white">Jadwal</label>
                        <select ref={scheduleRef} id="kapsters" className="w-full col-span-12 p-2 border rounded-lg cursor-pointer bg-slate-800 border-lime">
                            <option value="" selected disabled>Pilih Jadwal</option>
                            {schedules.filter((value) => value.status != "BOOKED" && new Date(value.dates + " " + value.times) > new Date()).map((value, index) => (
                                <option className="cursor-pointer" value={value.schedule_id} key={index}>
                                    {value.kapster_name} | {value.category_name} | {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value.category_price)} | {value.dates} | {value.times} WIB
                                </option>))}
                        </select> */}
                        <button onClick={handleClick} className="w-full col-span-12 p-2 mt-4 text-center rounded-lg cursor-pointer bg-lime text-slate-900 hover:bg-purple hover:text-white">Book now</button>
                    </form>
                </div>
            </section>
        </PublicLayout>
    )
}
