import { useRef } from "react";
import AdminLayout from "../../components/AdminLayout";

export default function Profile() {

    const fileRef = useRef(null);

    return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border bg-slate-900 rounded-xl border-lime">
                    <h1 className="text-4xl text-center font-futura">Profil</h1>
                    <form className="grid items-center justify-center grid-cols-12 gap-4 text-white">
                        <div className="col-span-6">
                            <label htmlFor="username" className="text-white">Username</label>
                            <input type="text" id="username" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan username disini..." />
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="text" id="email" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan email disini..." />
                            <label htmlFor="name" className="text-white">Nama</label>
                            <input type="text" id="name" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan nama disini..." />
                            <label htmlFor="phone" className="text-white">Nomor Telepon</label>
                            <input type="text" id="phone" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan nomo telepon disini..." />
                            <label htmlFor="address" className="text-white">Alamat</label>
                            <input type="text" id="address" className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime" placeholder="Masukan alamat disini..." />
                            <button className="w-full col-span-12 p-2 mt-4 text-center rounded-lg cursor-pointer bg-lime text-slate-900 hover:bg-purple hover:text-white">Ubah</button>
                        </div>
                        <div className="col-span-6">
                            <div className="max-w-sm overflow-hidden rounded-xl">
                        <img src="https://placehold.co/250x340" onClick={() => fileRef.current.click()} className="object-cover object-top w-full h-full cursor-pointer" />
                            </div>
                            <input type="file" ref={fileRef} hidden/>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}
