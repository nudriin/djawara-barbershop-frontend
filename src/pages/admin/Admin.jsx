import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import { NavLink } from "react-router-dom";
import swal from "sweetalert2";

export default function Admin() {
    const [admin, setAdmin] = useState([]);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.admin);

    useEffect(() => {
        const getAllAdmins = async () => {
            try {
                dispatch(buttonStart());
                const response = await fetch('/api/v1/admins/accounts', {
                    method: 'GET',
                    headers: {
                        'Authorization' : `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                
                if (!data.errors) {
                    setAdmin(data.data);
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
        if (admin.length === 0) {
            getAllAdmins();
        }

    }, [dispatch, admin, token]);

    return (
        <AdminLayout>
            <div className="flex flex-col items-center justify-center gap-5">
                <div className="space-y-4 text-center">
                    <h1 className="mb-4 text-4xl text-white font-futura">Admin</h1>
                    <NavLink to="/admins/admin/add">
                        <button className="px-2 py-2 rounded-full text-slate-900 bg-lime">Tambah</button>
                    </NavLink>
                </div>
                
                <div className="flex justify-center text-white">
                { admin.length === 0 || !admin.some((value) => value.role === "ADMIN") ? (
                    <img className="w-2/4 h-2/4" src="https://kfbgqdcxemiokdktlykv.supabase.co/storage/v1/object/public/nudriin/web_images/undraw_empty_re_opql.svg" />
                ) : (
                    <table>
                        <thead className="bg-lime text-slate-900">
                            <tr>
                                <th className="px-2">Id</th>
                                <th className="px-2">Nama</th>
                                <th className="px-2">Username</th>
                                <th className="px-2">Email</th>
                                <th className="px-2">No HP</th>
                                <th className="px-2">Alamat</th>
                                <th className="px-2">Role</th>
                            </tr>
                        </thead>
                        <tbody className="border border-lime">
                            {admin.filter((value) => value.role === "ADMIN").map((value, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-3">{value.id}</td>
                                    <td className="px-2 py-3">{value.name}</td>
                                    <td className="px-2 py-3">{value.username}</td>
                                    <td className="px-2 py-3">{value.email}</td>
                                    <td className="px-2 py-3">{value.phone}</td>
                                    <td className="px-2 py-3">{value.address}</td>
                                    <td className="px-2 py-3">{value.role}</td>
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
