import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Service from "./pages/public/Service";
import Pricelist from "./pages/public/Pricelist";
import Booking from "./pages/public/Booking";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Order from "./pages/admin/Order";
import Schedule from "./pages/admin/Schedule";
import Category from "./pages/admin/Category";
import Kapster from "./pages/admin/Kapster";
import Profile from "./pages/admin/Profile";
import Password from "./pages/admin/Password";
import Report from "./pages/admin/Report";
import Pemweb from "./pages/public/Pemweb";
import ScheduleAdd from "./pages/admin/ScheduleAdd";
import KapsterAdd from "./pages/admin/KapsterAdd";
import LoginAdmin from "./pages/public/LoginAdmin";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminSignRoute from "./components/AdminSignRoute";
import KapsterUpdate from "./pages/admin/KapsterUpdate";
import CategoryAdd from "./pages/admin/CategoryAdd";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/pricelist" element={<Pricelist />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pemweb" element={<Pemweb />} />

        <Route element={<AdminSignRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/orders" element={<Order />} />
          <Route path="/admin/schedules" element={<Schedule />} />
          <Route path="/admin/schedules/add" element={<ScheduleAdd />} />
          <Route path="/admin/categories" element={<Category />} />
          <Route path="/admin/categories/add" element={<CategoryAdd />} />
          <Route path="/admin/kapsters" element={<Kapster />} />
          <Route path="/admin/kapsters/add" element={<KapsterAdd />} />
          <Route path="/admin/kapsters/:id" element={<KapsterUpdate />} />
          <Route path="/admin/profiles" element={<Profile />} />
          <Route path="/admin/passwords" element={<Password />} />
          <Route path="/admin/reports" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

