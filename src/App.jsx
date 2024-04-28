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
import ScheduleAdd from "./pages/admin/ScheduleAdd";
import KapsterAdd from "./pages/admin/KapsterAdd";
import LoginAdmin from "./pages/public/LoginAdmin";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminSignRoute from "./components/AdminSignRoute";
import KapsterUpdate from "./pages/admin/KapsterUpdate";
import CategoryAdd from "./pages/admin/CategoryAdd";
import CategoryUpdate from "./pages/admin/CategoryUpdate";
import UserProfile from "./pages/user/UserProfile";
import UserPassword from "./pages/user/UserPassword";
import UserSignRoute from "./components/UserSignRoute";
import UserPrivateRoute from "./components/UserPrivateRoute";
import UserOrder from "./pages/user/UserOrder";
import UserReport from "./pages/user/UserReport";
import KapsterPublic from "./pages/public/KapsterPublic";

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
        <Route path="/kapster" element={<KapsterPublic />} />


        <Route element={<AdminSignRoute />}>
          <Route path="/admins/login" element={<LoginAdmin />} />
        </Route>

        <Route element={<UserSignRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminPrivateRoute />}>
          <Route path="/admins/orders" element={<Order />} />
          <Route path="/admins/schedules" element={<Schedule />} />
          <Route path="/admins/schedules/add" element={<ScheduleAdd />} />
          <Route path="/admins/categories" element={<Category />} />
          <Route path="/admins/categories/add" element={<CategoryAdd />} />
          <Route path="/admins/categories/:id" element={<CategoryUpdate />} />
          <Route path="/admins/kapsters" element={<Kapster />} />
          <Route path="/admins/kapsters/add" element={<KapsterAdd />} />
          <Route path="/admins/kapsters/:id" element={<KapsterUpdate />} />
          <Route path="/admins/profiles" element={<Profile />} />
          <Route path="/admins/passwords" element={<Password />} />
          <Route path="/admins/reports" element={<Report />} />
        </Route>

        <Route element={<UserPrivateRoute />}>
          <Route path="/users/orders" element={<UserOrder />} />
          <Route path="/users/profiles" element={<UserProfile />} />
          <Route path="/users/passwords" element={<UserPassword />} />
          <Route path="/users/histories" element={<UserReport />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

