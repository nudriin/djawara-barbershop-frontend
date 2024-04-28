import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
    const{curAdmin} = useSelector((state) => state.admin);

    return curAdmin?.data?.role == "ADMIN" || curAdmin?.data?.role == "OWNER" ? <Outlet /> : <Navigate to="/admins/login" />
}