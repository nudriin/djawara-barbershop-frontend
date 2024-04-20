import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function AdminSignRoute() {

    const{curAdmin} = useSelector((state) => state.admin);

    return curAdmin?.data ? <Navigate to="/" /> : <Outlet /> 
}
