import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function AdminSignRoute() {
    const token = Cookies.get('token');

    if (!token) {
        return <Outlet />
    }
    const admin = jwtDecode(token);

    return admin?.role == "ADMIN" || admin?.role == "OWNER" ? <Navigate to="/" /> : <Outlet />
}
