import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function UserPrivateRoute() {
    const{curAdmin} = useSelector((state) => state.admin);

    return curAdmin?.data?.role == "USER" ? <Outlet /> : <Navigate to="/login" />
}