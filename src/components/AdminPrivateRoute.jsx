import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
    const{curUser} = useSelector((state) => state.admin);

    return curUser?.data?.role == "ADMIN" || curUser?.data?.role == "OWNER" ? <Outlet /> : <Navigate to="/admin/login" />
}