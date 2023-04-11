import DashboardLayout from "./DashboardLayout";
import { Routes, Route } from "react-router-dom";
import GetDoctors from "../../components/Dashboard/User/GetDoctors";
import DrugInteractions from "../../components/Dashboard/Doctor/DrugInteractions/DrugInteractions";
import Profile from "../../components/Dashboard/Doctor/profile/Profile";
// import DrugInteractions from "../DrugInteractions/DrugInteractions"
import Home from "../Home/Home";
import AboutUs from "../AboutUs/AboutUs";
import Myconsultings from "../../components/Dashboard/Doctor/MyConsultings/MyConsultings";
import CompleteProfile from "../../components/Dashboard/Doctor/CompleteProfile/CompleteProfile.js";
import LogOut from "../LogOut";
import Consulting from "../../components/Dashboard/User/Consulting/Consulting";
import ContactForm from "../ContactUs/ContactUs";
import Report from "../Report/Report";

const menuItems = [
    {
        to: '/DrugInteractions',
        text: 'Check for Drug Interactions'
    },
    {
        to: '/consultings',
        text: 'Consultings'
    },
    {
        to: '/profile',
        text: 'Profile'
    },
    {
        to: '/CompleteProfile',
        text: 'Update Credentials'
    },
    {
        to: '/signout',
        text: 'Sign Out'
    },
]

const DoctorDashboard = () => {
  return (
    <DashboardLayout menuItems={menuItems}>
      <Routes>
        <Route path="DrugInteractions" element={<DrugInteractions />} />
        <Route path="About-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactForm />} />
        <Route path="/getdoctors" element={<GetDoctors />} />
        <Route path="/MyReports/:id" element={<Report />} />
        <Route path="*" element={<Myconsultings />} />
        <Route path="consultings" element={<Myconsultings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="CompleteProfile" element={<CompleteProfile />} />
        <Route path="/consultings/:id" element={<Consulting />} />

        <Route path="signout" element={<LogOut />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
