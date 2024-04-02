import { useRef } from "react";
import { NavLink } from "react-router-dom";
import PublicLayout from "../../components/PublicLayout";

export default function Register() {
    const passwordElement = useRef();
    const showElement = useRef();

    const handleShow = () => {
        if (passwordElement.current.type === "password") {
            passwordElement.current.type = 'text';
            showElement.current.value = 'Hide';
        } else {
            passwordElement.current.type = 'password';
            showElement.current.value = 'Show';
        }
    }
    return (
        <PublicLayout>

            <section className="flex items-center justify-center min-h-screen py-24 text-white bg-slate-900">
                <div className="w-9/12 p-6 space-y-5 border rounded-xl border-lime">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-20 text-center icon" xmlns="http://www.w3.org/2000/svg" fill="#C9F67F" stroke="" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8,10a3,3,0,0,0,3-3A3,3,0,0,0,8,4,2.91,2.91,0,0,0,5.2,6H2V8H5.2A2.91,2.91,0,0,0,8,10ZM8,6A.94.94,0,0,1,9,7,.94.94,0,0,1,8,8,.94.94,0,0,1,7,7,.94.94,0,0,1,8,6Zm11.8,5A2.91,2.91,0,0,0,17,9a3,3,0,0,0-3,3,2.74,2.74,0,0,0,0,.5l-4,2.24A3,3,0,0,0,8,14a2.91,2.91,0,0,0-2.8,2H2v2H5.2A2.91,2.91,0,0,0,8,20a3,3,0,0,0,3-3,2.74,2.74,0,0,0,0-.5l4-2.24A3,3,0,0,0,17,15a2.91,2.91,0,0,0,2.8-2H22V11ZM8,18a1,1,0,0,1,0-2,1,1,0,0,1,0,2Zm9-5a1,1,0,1,1,1-1A.94.94,0,0,1,17,13Z" fillRule="evenodd"></path><rect width="24" height="24" fill="none"></rect></g></svg>
                        <h1 className="mt-3 text-3xl text-center font-futura">Register</h1>
                        <p className="text-sm text-center">Inputkan data anda dengan benar</p>
                    </div>
                    <form className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <label htmlFor="email" className="text-white">Email</label>
                            <input type="text" name="email" id="email" placeholder="Masukan email disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <label htmlFor="name" className="text-white">Name</label>
                            <input type="text" name="name" id="name" placeholder="Masukan nama disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <label htmlFor="phone" className="text-white">Phone</label>
                            <input type="text" name="phone" id="phone" placeholder="Masukan nomor telepon disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                        </div>
                        <div className="flex flex-col col-span-6">
                            <label htmlFor="username" className="text-white">Username</label>
                            <input type="text" name="username" id="username" placeholder="Masukan username disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                            <label htmlFor="password" className="text-white">Password</label>
                            <div className="flex w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0">
                                <input type="password" name="password" id="password" className="w-full bg-transparent focus:outline-0" placeholder="Masukan password disini..." ref={passwordElement} />
                                <input type="button" name="show" id="show" className="self-end cursor-pointer" value="Show" ref={showElement} onClick={handleShow} />
                            </div>
                            <label htmlFor="address" className="text-white">Alamat</label>
                            <input type="text" name="address" id="address" placeholder="Masukan nomor alamat disini..." className="w-full p-2 mb-4 border rounded-lg bg-slate-800 border-lime focus:outline-0" />
                        </div>
                        <button className="w-full col-span-12 p-2 mb-4 rounded-lg bg-lime text-slate-900 hover:bg-purple hover:text-white">Register</button>
                    </form>
                    <div className="flex justify-center gap-1 text-sm">
                        <p className="">Sudah punya akun?</p>
                        <NavLink to="/login">
                            <span className="text-blue-500">Login</span>
                        </NavLink>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}
