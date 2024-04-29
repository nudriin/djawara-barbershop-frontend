import { useCallback, useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import { NavLink } from "react-router-dom";
import swal from "sweetalert2";


export default function Category() {
    const [categories, setCategories] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.admin);

    const handleDelete = useCallback(async (id) => {
        try {
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
                dispatch(buttonStart());
                const response = await fetch(`/api/v1/categories/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.token}`
                    }
                });

                const data = await response.json();

                if (!data.errors) {
                    console.log(data);
                    swal.fire({
                        title: "Success",
                        text: "Kategori berhasil dihapus!",
                        icon: "success",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    dispatch(buttonFinish());
                    setCategories([]);
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
    }, [dispatch, token]);

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
                    swal.fire({
                        title: "Error",
                        text: data.errors,
                        icon: "error",
                        customClass: 'bg-slate-900 text-lime rounded-xl'
                    });
                    throw new Error(data.errors);
                }
            } catch (e) {
                console.log(e);
                dispatch(buttonFinish());
            }
        }
        if (categories.length === 0) {
            getAllCategories();
        }

        if (deleteId) {
            handleDelete(deleteId);
        }
    }, [dispatch, deleteId, handleDelete, categories]);

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="space-y-4 text-center">
                    <h1 className="mb-4 text-4xl text-white font-futura">Kategori</h1>
                    <NavLink to="/admins/categories/add">
                        <button className="px-2 py-2 rounded-full text-slate-900 bg-lime">Tambah</button>
                    </NavLink>
                </div>
                
                <div className="flex justify-center text-white">
                {categories.length === 0 ? (
                    <img className="w-2/4 h-2/4" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                ) : (
                    <table>
                        <thead className="bg-lime text-slate-900">
                            <tr>
                                <th className="px-2">Id</th>
                                <th className="px-2">Nama Kategori</th>
                                <th className="px-2">Harga</th>
                                <th className="px-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="border border-lime">
                            {categories.map((value, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-3">{value.id}</td>
                                    <td className="px-2 py-3">{value.name}</td>
                                    <td className="px-2 py-3">{value.price}</td>
                                    <td className="px-2 py-3 space-x-1">
                                        <NavLink to={`/admins/categories/${value.id}`}>
                                            <button className='px-2 rounded-full bg-lime text-slate-900'>Ubah</button>
                                        </NavLink>
                                        <button onClick={() => setDeleteId(value.id)} className='px-2 bg-red-500 rounded-full cursor-pointer'>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                </div>
            </div>
        </AdminLayout>
    )
}
