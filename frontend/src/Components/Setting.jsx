import React, { useState ,useEffect} from 'react'
import axios from "axios";
import Loader from './Loader';
import {  toast } from "react-toastify";

function Setting() {
  const [Value,setValue]=useState({address:""});
  const [ProfileData,setProfileData]=useState()
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/get-user-information", {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfileData(response.data);
        setValue({address:response.data.address});
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    fetch();
  }, []);

  const change=(e)=>{
    const {name,value}=e.target;
    setValue({...Value,[name]:value})
  }
  const changeAddress=async()=>{
    const response = await axios.put("/update-address",
      Value,
      {
      headers: {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
   if(response.status===200){
           toast.success(response.data.message)
         }else{
         toast.error(response.data.message)
         }
  }
  return (
    <>
    <div className='w-100 d-flex flex-column '>
<h2 className='text-center'>Settings</h2>
{!ProfileData && <Loader/>}
{ProfileData && (
  <div className='d-flex flex-column '>
<div className='d-flex gap-5'>
  <div className='d-flex flex-column '>
    <h4>Username</h4>
    <span>{ProfileData.username}</span>
  </div>

  <div className='d-flex flex-column '>
    <h4>Email</h4>
    <span>{ProfileData.email}</span>
  </div>
</div>
<h5 className='mt-4'>Address</h5>
<textarea className='px-3  py-2 outline' placeholder='Enter your address' name='address' value={Value.address} onChange={change}/>

<button className='btnn ms-auto mt-2' style={{height:"40px",borderRadius:"8px"}} onClick={changeAddress}>Update</button>
</div>
)}

    </div>
    </>
  )
}

export default Setting