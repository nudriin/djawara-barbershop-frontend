import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function UserSignRoute() {

    const{curAdmin} = useSelector((state) => state.admin);

    return curAdmin?.data?.role == "USER"? <Navigate to="/" /> : <Outlet /> 
}
