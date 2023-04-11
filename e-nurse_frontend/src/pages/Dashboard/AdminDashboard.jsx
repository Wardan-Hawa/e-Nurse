import DashboardLayout from "./DashboardLayout";
import { Routes, Route } from "react-router-dom";
import LogOut from "../LogOut";
import Profile from "../../components/Dashboard/Doctor/profile/Profile";
import GetDoctors from "../../components/Dashboard/Admin/GetAllDoctors/GetDoctors";

const menuItems = [
  {
    to: "/profile",
    text: "Profile",
  },
  {
    to: "/getalldoctors",
    text: "Get All Doctors",
  },
  {
    to: "/signout",
    text: "Sign Out",
  },
];
const AdminDashboard = () => {
  return (
    <DashboardLayout menuItems={menuItems}>
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="getalldoctors" element={<GetDoctors />} />
        <Route path="signout" element={<LogOut />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
