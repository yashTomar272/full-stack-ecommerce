import { Link, useNavigate, useParams } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import productImgUrl from "../img/jacket.jpg"
import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import {  toast } from "react-toastify";

export default function CathogaryPage(){
 const navigate=useNavigate();
 const isLoggend=useSelector((state)=>state.auth.isLoggedIn);
 const role=useSelector((state)=>state.auth.role)
 const [heart,setHert]=useState("")

  const [Data,setData]=useState("");
   useEffect(()=>{
     const fetchData=async()=>{
       const response=await axios.get("http://localhost:8000/get-recent-book");
       setData(response.data.data);
     }
     fetchData();
   },[])
 
  
  

   const handleCart=async(id)=>{
    console.log(id)
    if(isLoggend === true && role==="user"){
      const response=await axios.put("/add-to-cart",{},{
        headers:{
          id:localStorage.getItem("id"),
          authorization:`Bearer ${localStorage.getItem("token")}`,
          bookid:id,
        }
      });
      if(response.status===200){
        toast.success(response.data.message)
      }else{
      toast.error(response.data.message)
      }
      
    }else{
      toast.info("Plzz login first")
      navigate("/Login")
    }
   
   }
  

   const handleFavourite=async(id)=>{

    if(isLoggend === true && role==="user"){
    setHert((prev) => ({
      ...prev,
      [id]: !prev[id], // सिर्फ उसी प्रोडक्ट का favorite टॉगल होगा
    }));
      const response=await axios.put("/add-to-fav",{},{
        headers:{
          id:localStorage.getItem("id"),
          authorization:`Bearer ${localStorage.getItem("token")}`,
          bookid:id,
        }
      });
      if(response.status===200){
        toast.success(response.data.message)
      }else{
      toast.error(response.data.message)
      }
    }else{
      toast.info("Plzz login first")

      navigate("/Login")
    }

   }
 
  return(
    
    <>
     <div className='   Card_main d-flex flex-wrap w-100 p-3 flex-column position-relative align-items-center justify-content-center'>
       <h3 className="text-center mb-4">Bestselling Products</h3>
       {!Data && <Loader/>}
       <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center w-100 ">
        {Data &&
          Data.map((item,i)=>(
           
            <div key={i} className="card position-relative" style={{width: "18rem",height:"410px",boxShadow:"0 0 10px rgba(0,0,0,0.1)"}}>
                              <span className="fs-2 heart  " onClick={()=>handleFavourite(item._id)} style={{cursor:"pointer"}} >{heart[item._id]?<FaHeart className="hertcc" />:<FiHeart className="hertc"/>}</span>
              
            <div className=" h-50 w-100 dalju p-1 "><img  className="card-img-top h-100 w-100" onClick={()=>navigate(`/ProductInfo/${item._id}`)} src={item.url} alt="Card image cap"  style={{objectFit:"contain"}}/></div>
             <div className="card-body position-relative" style={{cursor:"pointer"}}>
               <p className="card-title" style={{color:"gray"}}>Buy Smart</p>
               <h6 className="card-text">{item.title} raj found</h6>
               <h5><MdCurrencyRupee/>{item.price}</h5>
               <button
                 className="btnn fw-bold w-100 mt-2"
                 style={{ borderRadius: "6px", height: "40px" }}
                 onClick={()=>handleCart(item._id)}
               >
               Add to Cart
               </button>
             </div>
           </div>
       
          ))
        }
       </div>
     </div>
   
    </>
  )
}