import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserFailed, updateUserStart, updateUserSuccess } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";
import UserLayout from "../../components/UserLayout";

export default function UserProfile() {
    const { curAdmin, token } = useSelector((state) => state.admin);
    const fileRef = useRef(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
        console.log(formData);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const response = await fetch("/api/v1/users/current", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);
            if (!data.errors) {
                dispatch(updateUserSuccess(data));
                swal.fire({
                    title: "Success",
                    text: "Profil berhasil diubah!",
                    icon: "success",
                    customClass: 'bg-slate-900 text-lime rounded-xl'
                });
            } else {
                dispatch(updateUserFailed(data.errors));
                swal.fire({
                    title: "Error",
                    text: data.errors,
                    icon: "error",
                    customClass: 'bg-slate-900 text-lime rounded-xl'
                });
                throw new Error(data.errors)
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <UserLayout>
            <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border bg-slate-900 rounded-xl border-lime">
                    <h1 className="text-4xl text-center font-futura">Profil</h1>
                    <form className="grid items-center justify-center grid-cols-12 gap-4 text-white">
                        <div className="col-span-6">
                            <label htmlFor="username" className="text-white">Username</label>
                            <input defaultValue={curAdmin?.data?.username} disabled type="text" id="username" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan username disini..." />
                            <label htmlFor="email" className="text-white">Email</label>
                            <input defaultValue={curAdmin?.data?.email} disabled type="text" id="email" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan email disini..." />
                            <label htmlFor="name" className="text-white">Nama</label>
                            <input defaultValue={curAdmin?.data?.name} onChange={handleChange} type="text" id="name" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan nama disini..." />
                            <label htmlFor="phone" className="text-white">Nomor Telepon</label>
                            <input defaultValue={curAdmin?.data?.phone} onChange={handleChange} type="text" id="phone" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan nomo telepon disini..." />
                            <label htmlFor="address" className="text-white">Alamat</label>
                            <input defaultValue={curAdmin?.data?.address} onChange={handleChange} type="text" id="address" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan alamat disini..." />
                            <button onClick={handleUpdate} className="w-full col-span-12 p-2 mt-4 text-center rounded-lg cursor-pointer bg-lime text-slate-900 hover:bg-purple hover:text-white">Ubah</button>
                        </div>
                        <div className="col-span-6">
                            <div className="max-w-sm overflow-hidden rounded-xl">
                                <img src={curAdmin?.data?.profile_pic ? curAdmin?.data?.profile_pic : "https://placehold.co/250x340"} onClick={() => fileRef.current.click()} className="object-cover object-top w-full h-full cursor-pointer" />
                            </div>
                            <input type="file" ref={fileRef} hidden />
                        </div>
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}
