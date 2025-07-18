
import React, { useState, useEffect } from "react";
import google from '../img/google.png'
import loginn from '../img/login1.png'
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import logo from '../img/logooo.png';
import axios from 'axios';
import {  toast } from "react-toastify";

export default function Signup() {
 const navigate=useNavigate();
  const [Show, setShow] = useState(true);
  const URL = process.env.REACT_APP_URL;
  const handleShow = () => {
    setShow(!Show);
  };

  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:""
  })
const change=(e)=>{
  const {name,value}=e.target;
  setValues({...values,[name]:value})
}
const submit = async (e) => {
  e.preventDefault(); // Form ka default behavior rokna

  console.log("Clicked");

  try {
    if (!values.username || !values.email || !values.password || !values.address) {
      alert("All fields are required");
      return;
    }

    const response = await axios.post( `${URL}/signup` , values);
    if(response.status===200){
      toast.success(response.data.message)
    }else{
    toast.error(response.data.message)
    }
    navigate("/login");

  } catch (err) {
    console.log("Error:", err);
  }
};


   
  return (
    <>
      <div
        className="login_main position-relative d-flex  justify-content-center flex-row p-4 w-100"
        style={{ background: "#f1faee", height: "100vh" }}
      >
        <div
          className="Login_img w-50  position-relative"
          style={{
            background: "radial-gradient(#fff,#f48c06)",
            borderRadius: "40px",
          }}
        >
          <div className="  d-flex flex-column text-center align-items-center ">
            <h1
              style={{
                fontFamily: "n",
                fontWeight: "700",
                color: "black",
                fontSize: "45px",
                marginTop: "50px",
              }}
            >
              Your gateway to But Smart
            </h1>
            <p className=" -italic">
              Secure and seamless ligin experience for Buy Smart users...
            </p>
            <img
              src={loginn}
              className="img-fluid position-absolute"
              style={{ bottom: "0px" }}
            />
          </div>
        </div>
        <div className="Login_concept  dalju p-3    flex-column position-relative">
          <img
            src={logo}
            alt="logo_img"
            className="img-fluid m-0 p-0"
            style={{ maxWidth: "180px" }}
          />
          <h1 style={{ fontFamily: "n", fontWeight: "700" }}>Welcome Back</h1>
          <p style={{ color: "#cad2c5" }}>
            Plese <span>login</span> to your account
          </p>

          {/* form form form */}
          <form
            className="position-relative d-flex  align-items-center flex-column w-100"
            style={{ gap: "9px", marginTop: "30px" }}
           onSubmit={submit}
          >
            <div className="username position-relative  mt-2">
              <input
                className="inputt"
                type="text"
              name="username"
              value={values.username}
              onChange={change}
                required
              />
              <label className="Lable" htmlFor="username">
                Usernsme
              </label>
            </div>
            <div className="email position-relative  mt-2">
              <input
                className="inputt"
                type="email"
              name="email"
              value={values.email}
              onChange={change}
                required
              />
              <label className="Lable" htmlFor="email">
                Email
              </label>
            </div>

            <div className="password position-relative  mt-2">
              <input
                className="inputt"
                type={Show ? "password" : "text"}
                name="password"
                value={values.password}
                onChange={change}
                required
               
              />

              <label className="Lable" htmlFor="password">
                Password
              </label>
              {Show ? (
                <PiEyeSlash
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "17px",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={handleShow}
                />
              ) : (
                <PiEyeLight
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "17px",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={handleShow}
                />
              )}
            </div>
            <div className="address position-relative  mt-2">
            <textarea 
            className="inputt"
             id="address"
              name="address"
              value={values.address}
              onChange={change}
                required>
                </textarea>

              <label className="Lable" htmlFor="address">
                Address
              </label>
            </div>

            {/* {error && (
              <img
                src="warning.png"
                alt="Warning"
                style={{
                  width: "50px",
                  aspectRatio: "1",
                  margin: "1px auto",
                  scale: "0",
                  animation: " show 0.5s ease forwards",
                }}
              />
            )} */}
            {/* {error && (
              <span
                style={{
                  fontSize: "12px",
                  margin: "0 auto",
                  color: "red",
                  textAlign: "center",
                }}
              >
                Process Failed
              </span>
            )}
            {error && (
              <span
                style={{
                  fontSize: "12px",
                  margin: "0 auto",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {errorMsg}
              </span>
            )} */}
            
            <button  type="submit" className="btnnn">
           Signup
            </button>
          </form>
          <div className="dalju mt-3 w-100">
            <div
              style={{
                height: "2px",
                backgroundColor: "#e8e3e3",
                width: "90px",
              }}
            ></div>
            <div style={{ color: "#c2c1c1", padding: "10px" }}>
              or Login with
            </div>
            <div
              style={{
                height: "2px",
                backgroundColor: "#e8e3e3",
                width: "90px",
              }}
            ></div>
          </div>

          <button
        
            style={{
              border: "2px solid #c2c1c1",
              borderRadius: "10px",
              padding: "10px 30px",
              gap: "10px",
              cursor: "pointer",
            }}
            className="dalju  "
          >
            <img src={google} alt="google_img" style={{ width: "19px" }} />
            <h6 className="p-0 m-0">Google</h6>
          </button>
         
            
            <p className="mt-4">
              Don't have a account?{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "#f48c06",
                  borderBottom: "1px solid #f48c06",
                }}
              onClick={()=>navigate("/Login")}
              >
               Log In
              </span>
            </p>
         
        </div>
      </div>
    </>
  );
}
