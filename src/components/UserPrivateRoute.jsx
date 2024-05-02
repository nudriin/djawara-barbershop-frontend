import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function UserPrivateRoute() {
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/login" />
    }
    const user = jwtDecode(token);

    return user?.role == "USER" ? <Outlet /> : <Navigate to="/login" />
}