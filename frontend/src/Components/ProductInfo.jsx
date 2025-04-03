import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import productImgUrl from "../img/jacket.jpg";
import axios from 'axios'
import { useEffect,useState } from "react";
import Loader from "./Loader";
import Layout from "../Pages/Layout";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";



import { toast } from "react-toastify";
export default function ProductInfo() {
  const navigate=useNavigate();
  const [heart,setHert]=useState("")
 const isLoggend=useSelector((state)=>state.auth.isLoggedIn);
const role=useSelector((state)=>state.auth.role)
  const { id } = useParams();  
const [Data,setData]=useState();
useEffect(()=>{
  const fetchData=async()=>{
    const response=await axios.get(`http://localhost:8000/get-book-by-id/${id}`);
    setData(response.data.data);
    

  }
  fetchData();
},[])

 const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
  bookid:id,
}
 const handleFavourite=async()=>{

  if(isLoggend === true && role==="user"){
  setHert(!heart);
    const response=await axios.put("http://localhost:8000/add-to-fav",{},{headers});
    if(response.status===200){
        toast.success(response.data.message)
      }else{
      toast.error(response.data.message)
      }
  }else{
    toast.info("plz login First");
    navigate("/Login")
  }
 }
 const handleCart=async()=>{
  if(isLoggend === true && role==="user"){
    const response=await axios.put("/add-to-cart",{},{headers});
    if(response.status===200){
        toast.success(response.data.message)
      }else{
      toast.error(response.data.message)
      }
  }else{
    toast.info("plz login First");
    navigate("/Login")
  }
 
 }
  return (
    <>
      

       <Layout>
       {Data && (
        <div
          className="Info_main bg-light dalju  "
          style={{ heihgt: "900px" }}
        >
          
          
          
             <div className=" gap-5 flex-wrap dalju">
             <div
               className="Info_img bg-dalju p-5 position-relative"
               style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "380px" }}
             >
              
                <span className="fs-2 heart  " onClick={handleFavourite} style={{cursor:"pointer"}} >{heart?<FaHeart className="hertcc" />:<FiHeart className="hertc"/>}</span>
              
               <img
                 src={Data.url}
                 alt="info_img"
                 className="h-100 w-100"
               />
             </div>
             <div className="Info_img" style={{ width: "380px" }}>
               <h2>{Data.title}</h2>
               <div style={{ cursor: "pointer" }} className="d-flex gap-2">
                 <FaRegStar style={{ color: "#f94144" }} />
                 <FaRegStar style={{ color: "#f94144" }} />
                 <FaRegStar style={{ color: "#f94144" }} />
                 <FaRegStar style={{ color: "#f94144" }} />
                 <FaStarHalfAlt style={{ color: "#f94144" }} />
               </div>
               <h3>Rs.{Data.price}</h3>
               <span>Description:</span>
               <p>{Data.desc}</p>
             
                 <button
                 className="btnn fw-bold w-100 mt-2"
                 style={{ borderRadius: "6px", height: "40px" }}
                 onClick={handleCart}
               >
                 Add To Cart
               </button>
           
              
             </div>
           </div>
        
            
       
        </div>
         )}
         {!Data && <div><Loader/></div>}
       </Layout>
    </>
  );
}
