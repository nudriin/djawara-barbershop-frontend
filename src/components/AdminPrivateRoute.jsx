import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function AdminPrivateRoute() {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/admins/login" />
    }
    const admin = jwtDecode(token);

    return admin?.role == "ADMIN" || admin?.role == "OWNER" ? <Outlet /> : <Navigate to="/admins/login" />
}