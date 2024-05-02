import { NavLink } from "react-router-dom";
import { persistor } from "../redux/store";
import swal from "sweetalert2";
import Cookies from "js-cookie";

export default function AdminSidebar() {
    const activeLink = 'bg-lime white rounded-full text-slate-900';
    const nonActiveLink = '';


    const handleLogout = async () => {
        const { isConfirmed } = await swal.fire({
            title: "Anda yakin?",
            text: "Akan akan keluar dari sistem",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7E30E1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            customClass: 'bg-slate-900 text-lime rounded-xl'
        });
        
        if(isConfirmed) {
            persistor.purge();
            Cookies.remove('token');
            window.location.reload();
        }
    }

    return (
        <div className="flex flex-col justify-between text-white gap-14">
            <NavLink to="/">
                <h1 className="w-9/12 px-2 mx-auto mt-4 text-3xl text-center text-slate-900 bg-lime -skew-y-2 font-futura">Djawara</h1>
            </NavLink>
            <div>
                <ul className="flex flex-col gap-4 ml-6 mr-6">
                    <NavLink to="/admins/orders" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Pesanan</li>
                    </NavLink>
                    <NavLink to="/admins/schedules" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Jadwal</li>
                    </NavLink>
                    <NavLink to="/admins/categories" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Kategori</li>
                    </NavLink>
                    <NavLink to="/admins/kapsters" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Kapster</li>
                    </NavLink>
                    <NavLink to="/admins/profiles" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Profil</li>
                    </NavLink>
                    <NavLink to="/admins/passwords" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Password</li>
                    </NavLink>
                    <NavLink to="/admins/reports" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-2 font-bold font-rubik hover:bg-lime hover:text-slate-900 hover:rounded-full">Laporan</li>
                    </NavLink>
                </ul>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 ml-6 mr-6 font-bold text-left rounded-full bg-purple font-rubik hover:bg-red-500">Logout</button>
        </div>
    )
}
