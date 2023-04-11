import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

import Signin from "./pages/Signin/Signin";
import AskNurses from "./pages/AskYoure-Nurse/AskYoure-Nurse";
import RequiredAuth from "./RequiredAuth";
import Dashboard from "./pages/Dashboard/Dashboard";
import AboutUs from "./pages/AboutUs/AboutUs";
import Notification from "./components/Notifications/Notifications";
import Report from "./pages/Report/Report";
import ContactForm from "./pages/ContactUs/ContactUs";
import Footer from "./components/footer/Footer";
import SignUp from "./components/Dashboard/User/signUp/SingUp";
import DoctorSignUp from "./components/Dashboard/Doctor/signUp/SingUp";
import Doctors from "./pages/Home/doctor/Doctors";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route element={<RequiredAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/AskYoure-Nurse" element={<AskNurses />} />
            <Route path="/*" element={<Dashboard />} />
            <Route path="/ndoctors" element={<Doctors />} />

            {/* <Route path="dashboard/*" element={<Dashboard />}></Route> */}
              {/* <Route path="contact-us" element={<ContactForm />}></Route>  */}
          </Route>

          <Route path="/signupdoctor" element={<DoctorSignUp />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      
      <Notification />
      <Footer/>
    </>
  );
}

export default App;
