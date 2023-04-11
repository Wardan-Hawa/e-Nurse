import Features from "../../components/Features/Features"
import HomeCarousel from "../../components/Hero/Hero"
import Layout from "../../components/layout/Layout"
import Doctors from "./doctor/Doctors"
import Team from "./teem/Team"




const Home = () => {
    return (
        <>
            <HomeCarousel />
            <Features />
            
            <Doctors/>
        </>
    )
}

export default Home