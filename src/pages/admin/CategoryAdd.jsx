import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { buttonFailed, buttonFinish, buttonStart } from "../../redux/admin/adminSlice";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CategoryAdd() {
    const [formData, setFormData] = useState({});
    const {token, loading} = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value});
        console.log(formData);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            dispatch(buttonStart());
            const response = await fetch('/api/v1/categories', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token.token}`
                },
                body : JSON.stringify(formData)
            });
    
            const data = await response.json();

            if(!data.errors) {
                console.log(data);
                swal.fire({
                    title: "Success",
                    text: "Kategori berhasil ditambah!",
                    icon: "success",
                    customClass: 'bg-slate-900 text-lime rounded-xl'
                });
                dispatch(buttonFinish());
                navigate('/admins/categories');
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
    
    return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
                <div className="w-[350px] p-6 space-y-5 border rounded-xl border-lime">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-20 text-center icon" xmlns="http://www.w3.org/2000/svg" fill="#C9F67F" stroke="" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8,10a3,3,0,0,0,3-3A3,3,0,0,0,8,4,2.91,2.91,0,0,0,5.2,6H2V8H5.2A2.91,2.91,0,0,0,8,10ZM8,6A.94.94,0,0,1,9,7,.94.94,0,0,1,8,8,.94.94,0,0,1,7,7,.94.94,0,0,1,8,6Zm11.8,5A2.91,2.91,0,0,0,17,9a3,3,0,0,0-3,3,2.74,2.74,0,0,0,0,.5l-4,2.24A3,3,0,0,0,8,14a2.91,2.91,0,0,0-2.8,2H2v2H5.2A2.91,2.91,0,0,0,8,20a3,3,0,0,0,3-3,2.74,2.74,0,0,0,0-.5l4-2.24A3,3,0,0,0,17,15a2.91,2.91,0,0,0,2.8-2H22V11ZM8,18a1,1,0,0,1,0-2,1,1,0,0,1,0,2Zm9-5a1,1,0,1,1,1-1A.94.94,0,0,1,17,13Z" fillRule="evenodd"></path><rect width="24" height="24" fill="none"></rect></g></svg>
                        <h1 className="mt-3 text-3xl text-center font-futura">Tambah Kategori</h1>
                    </div>
                    <form className="flex items-center justify-center gap-4">
                        <div className="col-span-6">
                            <label htmlFor="name" className="text-white">Nama</label>
                            <input onChange={handleChange} type="text" name="name" id="name" placeholder="Masukan nama disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <label htmlFor="price" className="text-white">Harga</label>
                            <input onChange={handleChange} type="number" name="price" id="price" placeholder="Masukan harga disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <button onClick={handleClick} disabled={loading} className="w-full p-2 mb-4 rounded-lg bg-lime text-slate-900 hover:bg-purple hover:text-white">Tambah</button>
                        </div>
                    </form>
                    <div className="flex justify-center gap-1 text-sm">
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
