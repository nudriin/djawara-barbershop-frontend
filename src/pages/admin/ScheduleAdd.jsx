import AdminLayout from "../../components/AdminLayout";

export default function ScheduleAdd() {
    return (
        <AdminLayout>
            <div className="flex items-center justify-center min-h-screen text-white bg-slate-900">
                <div className="p-6 space-y-5 border w-[350px] rounded-xl border-lime">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-20 text-center icon" xmlns="http://www.w3.org/2000/svg" fill="#C9F67F" stroke="" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8,10a3,3,0,0,0,3-3A3,3,0,0,0,8,4,2.91,2.91,0,0,0,5.2,6H2V8H5.2A2.91,2.91,0,0,0,8,10ZM8,6A.94.94,0,0,1,9,7,.94.94,0,0,1,8,8,.94.94,0,0,1,7,7,.94.94,0,0,1,8,6Zm11.8,5A2.91,2.91,0,0,0,17,9a3,3,0,0,0-3,3,2.74,2.74,0,0,0,0,.5l-4,2.24A3,3,0,0,0,8,14a2.91,2.91,0,0,0-2.8,2H2v2H5.2A2.91,2.91,0,0,0,8,20a3,3,0,0,0,3-3,2.74,2.74,0,0,0,0-.5l4-2.24A3,3,0,0,0,17,15a2.91,2.91,0,0,0,2.8-2H22V11ZM8,18a1,1,0,0,1,0-2,1,1,0,0,1,0,2Zm9-5a1,1,0,1,1,1-1A.94.94,0,0,1,17,13Z" fillRule="evenodd"></path><rect width="24" height="24" fill="none"></rect></g></svg>
                        <h1 className="mt-3 text-3xl text-center font-futura">Tambah Jadwal</h1>
                    </div>
                    <form className="flex flex-col mx-auto">
                        <label htmlFor="old_password" className="text-white">Password Lama</label>
                        <input type="password" name="old_password" id="old_password" placeholder="Masukan username disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                        <label htmlFor="new_password" className="text-white">Password Baru</label>
                        <input type="password" name="new_password" id="new_password" placeholder="Masukan password disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                        <input type="button" name="show" id="show" className="self-end mt-0 mb-6 cursor-pointer" value="Show" />
                        <button className="w-full p-2 mb-4 rounded-lg bg-lime text-slate-900 hover:bg-purple hover:text-white">Tambah</button>
                    </form>
                    <div className="flex justify-center gap-1 text-sm">
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
