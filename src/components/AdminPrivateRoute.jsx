import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
    const{token} = useSelector((state) => state.admin);

    return token ? <Outlet /> : <Navigate to="/admin/login" />
}