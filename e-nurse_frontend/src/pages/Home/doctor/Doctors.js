import { Avatar } from '@mui/material';
import React from 'react';

import './styles.css';

const Doctors = () => {
    return (
       <>
       <div className="" style={{display:"flex", 
      alignItems: "center",
      textAlign: "center",
      justifyContent:"center"}}>
       <h1 className=" "> MEET OUR TEAM OF SPECIALISTS.</h1>
        
       </div>
       <div className="" style={{display:"flex", 
      alignItems: "center",
      textAlign: "center",
      justifyContent:"center"}}>
      
        <h3 className=" ">We make sure that your Life are in Good Hands.</h3>
       </div>
         <div className="container d-flex justify-content-between ">
      <div className="card p-3 py-4 " >
        <div className="text-center">
          <Avatar src="https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
           style={{
            width: 100,
            height: 100,
            margin: "0 35% 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
             className="rounded-circle" alt="Profile" />
          <h3 className="mt-2">Dr. Amelia Green</h3>
         
          <span className="mt-1 clearfix">Endocrinology</span>
          <br/>

          <small className="mt-4">  Endocrinologist with a focus on diabetes management, empowers patients.</small>
          <br/>

          <small className="mt-4"> AmeliaGreen@eNurs.com</small>
          <div className="social-buttons mt-5">
            
          <button className="ms-3 btn btn-bright cyan  bg-color text-white"><i ></i> contact </button>
          </div>
        </div>
      </div>
      <div className="card p-3 py-4">
        <div className="text-center">
          <Avatar src="https://media.istockphoto.com/id/1187318087/photo/portrait-of-happy-young-handsome-indian-man-doctor-smiling.jpg?s=612x612&w=0&k=20&c=PPGbJKhAjkab5waxx7GCleovSMuXh4KNW0ASqUkfbaU="
           style={{
            width: 100,
            height: 100,
            margin: "0 35% 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
             className="rounded-circle" alt="Profile" />
          <h3 className="mt-2">Dr. Jonathan Hayes</h3>
          <span className="mt-1 clearfix">Gastroenterology</span>
          <br/>

          <small className="mt-4">Experienced gastroenterologist, committed to improving digestive health.</small>
          <br/>

          <small className="mt-4">JonathanHayes@eNurs.com</small>
          <div className="social-buttons mt-5">
            
          <button className="ms-3 btn btn-bright cyan  bg-color text-white"><i ></i> contact </button>

          </div>
        </div>
      </div>
      <div className="card p-3 py-4">
        <div className="text-center">
          <Avatar src="https://www.discovery.co.za/gallery/discoverycoza/content-hub/good-health/young-doctor.jpg"
           style={{
            width: 100,
            height: 100,
            margin: "0 35% 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
             className="rounded-circle" alt="Profile" />
          <h3 className="mt-2">Dr. Sophia Kim</h3>
          <span className="mt-1 clearfix">psychology  </span>
          <br/>

          <small className="mt-4"> psychologist specializing in anxiety and depression, develops health strategies.</small>
          <br/>

          <small className="mt-4">SophiaKim@eNurs.com</small>
          <div className="social-buttons mt-5">
            
            <button className="ms-3 btn btn-bright cyan  bg-color text-white"><i ></i> contact </button>
          </div>
        </div>
      </div>
    </div>
        
       </>
        
      );
}
export default Doctors;