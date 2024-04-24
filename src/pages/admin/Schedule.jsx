import { NavLink } from 'react-router-dom'
import AdminLayout from '../../components/AdminLayout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buttonFailed, buttonFinish, buttonStart } from '../../redux/admin/adminSlice';
import swal from 'sweetalert2';

export default function Schedule() {
    const [schedules, setSchedules] = useState([]);
    const { token } = useSelector((state) => state.admin);
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
                    setSchedules(data?.data?.schedules);
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
    }, [dispatch, schedules])

    const handleDelete = async (id) => {
        const { isConfirmed } = await swal.fire({
            title: "Anda yakin?",
            text: "Tindakan ini akan menghapus data anda",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7E30E1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            customClass: 'bg-slate-900 text-lime rounded-xl'
        });
        if (isConfirmed) {
            try {
                dispatch(buttonStart());
                const response = await fetch(`/api/v1/schedules/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.token}`
                    }
                });

                const data = await response.json();
                if (!data.errors) {
                    dispatch(buttonFinish());
                    swal.fire({
                        title: "Success",
                        text: "Jadwal berhasil dihapus!",
                        icon: "success",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    setSchedules([]);
                } else {
                    swal.fire({
                        title: "Error",
                        text: data.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    dispatch(buttonFailed(data.errors));
                    throw new Error(data.errors);
                }
            } catch (e) {
                dispatch(buttonFinish());
            }
        }
    }
    return (
        <AdminLayout>
            <div>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <div className='space-y-4 text-center'>
                        <h1 className="text-4xl text-white font-futura mb-4">Jadwal</h1>
                        <NavLink to="/admin/schedules/add">
                            <button className='p-2 rounded-full bg-lime'>Tambah</button>
                        </NavLink>
                    </div>
                    <div className='text-white'>
                        {schedules.length === 0 ? (
                            <div className='flex items-center justify-center'>
                                <img className="w-2/4 h-2/4" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                            </div>
                        ) : (
                            <table>
                                <thead className="bg-lime text-slate-900">
                                    <tr>
                                        <th className="px-2">Id</th>
                                        <th className="px-2">Kapster</th>
                                        <th className="px-2">Kategori</th>
                                        <th className="px-2">Tanggal</th>
                                        <th className="px-2">Jam</th>
                                        <th className="px-2">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="border border-lime">
                                    {schedules.map((value, index) => (
                                        <tr key={index}>
                                            <td className="px-2 py-3">{value.schedule_id}</td>
                                            <td className="px-2 py-3">{value.kapster_name}</td>
                                            <td className="px-2 py-3">{value.category_name}</td>
                                            <td className="px-2 py-3">{value.dates}</td>
                                            <td className="px-2 py-3">{value.times}</td>
                                            <td className="px-2 py-3">
                                                <button onClick={() => handleDelete(value.schedule_id)} className='px-2 bg-red-500 rounded-full'>Hapus</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
