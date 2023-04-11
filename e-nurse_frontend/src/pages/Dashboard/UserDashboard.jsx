import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import MyReports from "../../components/Dashboard/User/myReports/MyReports"
import GetDoctors from "../../components/Dashboard/User/GetDoctors"
import AskNurse from "../AskYoure-Nurse/AskYoure-Nurse"
import CreateReport from "../../components/Dashboard/User/CreateReport/CreateReport"
import LogOut from "../LogOut"
import SingleDoctor from "../../components/Dashboard/User/sigleDoctor/SingleDoctor"
import AboutUs from "../AboutUs/AboutUs"
import ContactForm from "../ContactUs/ContactUs"
import Profile from "../../components/Dashboard/User/profile/Profile"
import Report from "../Report/Report"
import Consulting from "../../components/Dashboard/User/Consulting/Consulting"
import Myconsultings from "../../components/Dashboard/Doctor/MyConsultings/MyConsultings"

const menuItems = [
    {
        to: '/my-reports',
        text: 'My Reports'
    },
    {
        to: '/consultings',
        text: 'Consultings'
    },
    {
        to: '/Ask-e-Nurse',
        text: 'Ask e-Nurse'
    },
    {
        to: '/profile',
        text: 'Profile'
    },
    {
        to: '/signin',
        text: 'Sign Out'
    },
]

const UserDashboard = () => {
    return (
        <DashboardLayout menuItems={menuItems}>
            <Routes>
                <Route path='create-report' element={<CreateReport />} />

                <Route path="/consultings" element={<Myconsultings />} />

                <Route path="Ask-e-Nurse" element={<AskNurse />} />
                <Route path="About-us" element={<AboutUs />} />
                <Route path="contact-us" element={<ContactForm />} />
                <Route path="/getdoctors" element={<GetDoctors />} />
                <Route path='/getdoctors/:id' element={<SingleDoctor />} />
                <Route path="/my-reports/:id" element={<Report />} />
                {/* <Route path="/consultings/" element={<>consulting index</>} /> */}
                <Route path="/consultings/:id" element={<Consulting />} />
                <Route path="*" element={<MyReports />} />
                <Route path="/signout" element={<LogOut />} />
                <Route path="profile" element={<Profile />} />
                {/*  <Route path="signout" element={<DoctorConsultings />} /> */}
            </Routes>
        </DashboardLayout>
    )
}

export default UserDashboard