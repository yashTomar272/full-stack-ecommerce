import Layout from '../Pages/Layout';
import React, { useState, useEffect } from "react";
import photo from '../img/2.jpg'
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Loader from './Loader';
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Favourites from './Favourites';
import Order from './Order';
import Setting from './Setting';
import { TbLogout } from "react-icons/tb";
import { authActions } from '../store/auth';
import AdminDashboard from './AdminDashboard';



export default function Profile(){
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const role=useSelector((state)=>state.auth.role);
    const [date,setDate]=useState([]);
  

  // const isLoggedIn=useSelector();
const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
}
const [profile,setProfile]=useState();
  useEffect(()=>{
     const fetch=async()=>{
const response=await axios.get("http://localhost:8000/get-user-information",{headers});

   const hhdate=new Date( response.data.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

setDate(hhdate)
setProfile(response.data);
     }
     fetch();
  },[])
  return(
    <>
    <Layout>
      {role==="admin" &&
      (
        <AdminDashboard/>
      )}
    {role==="user" &&
    (
      <div className=" Main_user w-100  dalju h-100 bg-light">
      <div className="container  py-5 dalju flex-column gap-4">
        {!profile && <Loader/>}
  {profile &&
  <>
    <div className='User_First bg- w-100  d-flex align-items-center justify-content-center p-3 flex-column ' style={{borderRadius:"10px",background:"#ffd6d6"}}>
     <div className='dalju' style={{width:"90px",aspectRatio:"1",borderRadius:"50%",border:"1px solid #737373"}}> <img src={photo} alt='User_img'  style={{width:"90px",aspectRatio:"1",borderRadius:"50%"}}/></div>
     <div className='d-flex gap-2'> <h6>Name :</h6><span>{profile.username}</span></div>
     <div className='d-flex gap-2'> <h6>Email :</h6>{profile.email}</div>
       <div className='d-flex gap-2'> <h6>Date :</h6>{date}</div>
      <div className='dalju'><button className='btnn dalju gap-2' 
      onClick={()=>
      {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
localStorage.clear("id");
localStorage.clear("token");
localStorage.clear("role");
navigate("/")
      }
      }
      style={{height:"40px",borderRadius:"8px"}}> Logout <TbLogout/> </button> </div>
    
    </div>
  </>}
  
{
  role === "user" &&
  (
<Tabs className=" flex-column">
<TabList className="d-flex gap-2 listStyle  ">
  <Tab className="dalju">
        <button className='btnn' style={{height:"40px",borderRadius:"8px"}}>Favroutie</button>
  </Tab>
  <Tab>
   <button className='btnn' style={{height:"40px",borderRadius:"8px"}}> Order</button>
    </Tab>
    <Tab>
   <button className='btnn' style={{height:"40px",borderRadius:"8px"}}> Setting</button>
    </Tab>
</TabList>
              <TabPanel>
              <Favourites/>
            </TabPanel>
            <TabPanel>
             <Order/>
            </TabPanel>
            <TabPanel>
              <Setting/>
            </TabPanel>
</Tabs>
  )
}


     
     
     
     
        
    
    </div>
    </div>
    )}
    </Layout>
    </>
  )
}