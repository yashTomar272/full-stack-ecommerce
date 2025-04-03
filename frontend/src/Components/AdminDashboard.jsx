import { FaBasketShopping } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductDetail from "./ProductDetail";
import UserDetail from "./UserDetail";
import OrderDetail from "./OrderDetail";
import AnalyticI from "./AnalyticI";
import AnalyticII from "./AnalyticII";
import AnalyticIII from "./AnalyticIII";
import photo from '../img/2.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbLogout } from "react-icons/tb";


export default function AdminDashboard() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [totaluser,setTotalUser]=useState();
   const role=useSelector((state)=>state.auth.role);
 const [TotalOrder, setTotalOrder] = useState()

   const [Name,setName]=useState();
   const [Email,setEmail]=useState();
const [count,setCount]=useState("")
   const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
     const fetch=async()=>{
const response=await axios.get("/get-user-information",{headers});
const Response=await axios.get("/get-all-book");
const tuser=await axios.get("/get-all-user");
const OrderRes=await axios.get("/get-all-orders",{headers});
setTotalOrder(OrderRes.data.data.length);
setTotalUser(tuser.data.data.length)
setCount(Response.data.data.length);
setName(response.data.username);
setEmail(response.data.email);
     }
     fetch();
  },[])

 

  return (
    <>
      <div className="w-100  bg-light">
        <div className=" py-1 m-2 d-flex flex-column gap-4">
          <div
            className="w-100 text-center p-3 Admin_hover "
            style={{
              borderRadius: "7px",
              background: "#ffe5ec",
              border: "2px solid #e6e5e5",
            }}
          >
            <h4>Admin Dashboard</h4>
          </div>
          <div
            className="User_First Admin_hover bg- w-100  d-flex align-items-center justify-content-center p-3 flex-column "
            style={{
              borderRadius: "10px",
              background: "#ffe5ec",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="dalju"
              style={{
                width: "90px",
                aspectRatio: "1",
                borderRadius: "50%",
                border: "1px solid #737373",
              }}
            >
              {" "}
              <img
                src={photo}
                alt="User_img"
                style={{ width: "90px", aspectRatio: "1", borderRadius: "50%" }}
              />
            </div>
            <div className="d-flex gap-2">
              {" "}
              <h6>Name :</h6>
              <span>{Name}</span>
            </div>
            <div className="d-flex gap-2">
              {" "}
              <h6>Email :</h6>
              <span>{Email}</span>
            </div>
           
            <div className="d-flex gap-2">
              {" "}
              <h6>Role :</h6>
              <span>{role}</span>
            </div>
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
          <div className=" Track_main d-flex align-items-center justify-content-evenly row  m-3">
            <div  className="dalju p-3 col m-3  flex-column Admin_hover"
              style={{
                border: "1px solid #737373",
                borderRadius: "9px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                background: "#ffe5ec",
              }}>
            <AnalyticI/>
            </div>
            <div  className="dalju p-3 col m-3  flex-column Admin_hover"
              style={{
                border: "1px solid #737373",
                borderRadius: "9px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                background: "#ffe5ec",
              }}>
            <AnalyticII/>
            </div>
            <div  className="dalju p-3 col m-3  flex-column Admin_hover"
              style={{
                border: "1px solid #737373",
                borderRadius: "9px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                background: "#ffe5ec",
              }}>
            <AnalyticIII/>
            </div>
            </div>
          <Tabs>
            <TabList className=" Track_main d-flex align-items-center justify-content-evenly row  m-3">
              <Tab
                className="dalju p-3 col m-3  flex-column Admin_hover"
                style={{
                  border: "1px solid #737373",
                  borderRadius: "9px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  background: "#ffe5ec",
                }}
              >
                <FaBasketShopping
                  style={{
                    color: "f94144",
                    fontWeight: "500",
                    fontSize: "40px",
                  }}
                />
                <p className="mb-0 text-dark text-center">
                  {count}
                </p>
                <h6 className="text-center">Total Product</h6>
              </Tab>
              <Tab
                className="dalju p-3 col m-3 flex-column Admin_hover"
                style={{
                  border: "1px solid #737373",
                  borderRadius: "9px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  background: "#ffe5ec",
                }}
              >
                <FaListOl
                  style={{
                    color: "f94144",
                    fontWeight: "500",
                    fontSize: "40px",
                  }}
                />
                <p className="mb-0 text-dark text-center">
                  {TotalOrder}
                </p>
                <h6 className="text-center">Total Order</h6>
              </Tab>
              <Tab
                className="dalju p-3 col m-3 flex-column Admin_hover"
                style={{
                  border: "1px solid #737373",
                  borderRadius: "9px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                  background: "#ffe5ec",
                }}
              >
                <FiUsers
                  style={{
                    color: "f94144",
                    fontWeight: "500",
                    fontSize: "40px",
                  }}
                />
                <p className="mb-0 text-dark text-center">
                {totaluser}
                </p>
                <h6 className="text-center">Total User</h6>
              </Tab>
            </TabList>
            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            <TabPanel>
              <UserDetail />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
