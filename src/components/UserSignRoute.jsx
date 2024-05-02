import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function UserSignRoute() {
    const token = Cookies.get('token');

    if (!token) {
        return <Outlet />
    }
    const user = jwtDecode(token);

    return user?.role == "USER" ? <Navigate to="/" /> : <Outlet />

}
