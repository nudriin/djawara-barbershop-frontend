import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function AdminSignRoute() {

    const{curAdmin} = useSelector((state) => state.admin);

    return curAdmin?.data?.role == "ADMIN" || curAdmin?.data?.role == "OWNER" ? <Navigate to="/" /> : <Outlet /> 
}
