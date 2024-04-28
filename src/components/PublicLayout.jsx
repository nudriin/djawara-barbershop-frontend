/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function PublicLayout({ children }) {
    const activeLink = 'bg-lime text-slate-900 rounded-full';
    const nonActiveLink = '';
    const { curAdmin } = useSelector((state) => state.admin);
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 text-white border-2 border-t-0 border-b-2 border-l-0 border-r-0 bg-slate-900 font-poppins border-b-lime">
                <div className="flex items-center justify-center max-w-6xl p-4 mx-auto sm:justify-between">
                    <NavLink to="/">
                        <h1 className="px-2 text-3xl text-slate-900 bg-lime -skew-y-2 font-futura">Djawara</h1>
                    </NavLink>
                    <ul className="flex gap-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <li className="px-3 py-1 hover:bg-lime hover:text-slate-900 hover:rounded-full">Home</li>
                        </NavLink>
                        <NavLink to="/kapster" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <li className="px-3 py-1 hover:bg-lime hover:text-slate-900 hover:rounded-full">Kapster</li>
                        </NavLink>
                        <NavLink to="/service" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <li className="px-3 py-1 hover:bg-lime hover:text-slate-900 hover:rounded-full">Service</li>
                        </NavLink>
                        <NavLink to="/pricelist" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <li className="px-3 py-1 hover:bg-lime hover:text-slate-900 hover:rounded-full">Pricelist</li>
                        </NavLink>
                        <NavLink to="/booking" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <li className="px-3 py-1 hover:bg-lime hover:text-slate-900 hover:rounded-full">Booking</li>
                        </NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <li className="px-3 py-1 hover:bg-lime hover:text-slate-900 hover:rounded-full">Contact</li>
                        </NavLink>
                    </ul>
                    <ul className="flex gap-4">
                        {
                            curAdmin ? curAdmin.data.role === "USER" ? (
                                <NavLink to="/users/profiles">
                                    <img src={curAdmin?.data?.profile_pic} className="h-9 w-9"/>
                                </NavLink>
                            ) : (
                                <NavLink to="/admins/profiles">
                                    <img src={curAdmin?.data?.profile_pic} className="h-9 w-9"/>
                                </NavLink>
                            ) : (
                                <>
                                    <NavLink to="/login">
                                        <li className="px-3 py-1 cursor-pointer text-lime">Login</li>
                                    </NavLink>
                                    <NavLink to="/register">
                                        <li className="px-3 py-1 rounded-full cursor-pointer text-slate-900 bg-lime hover:shadow-md hover:bg-dark-lime">Register</li>
                                    </NavLink>
                                </>
                            )
                        }

                    </ul>
                </div>
            </div>
            <div>
                {children}
            </div>
        </>
    )
}
