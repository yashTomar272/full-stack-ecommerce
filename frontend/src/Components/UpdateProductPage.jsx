import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios
 from "axios";
import {  toast } from "react-toastify";

 export default function UpdateProductPage(){
   
   const { id } = useParams();
   
   const navigate=useNavigate();
 const [Data,setData]=useState({
  title:"",
price:"",
url:"",
category:"",
desc:""

 })
 const cathArr=[
  {name:"Fashion"},
  {name:"Shirt"},
  {name:"Jacket"},
  {name:"Mobile"},
  {name:"Laptop"},
  {name:"Shoes"},
  {name:"Home"},
 {name:"Books"},
]
const change=(e)=>{
  const {name,value}=e.target;
  setData({...Data,[name]:value})
}
const headers={
  id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`,
  bookid:id
}  

useEffect(()=>{
  const fetchData=async()=>{
    const response=await axios.get(`/get-book-by-id/${id}`)
setData(response.data.data)
  }
  fetchData();
},[])

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
if(
  Data.title===""||
  Data.price===""||
  Data.url===""||
  Data.category===""||
  Data.desc===""
){
  alert("All fields are required")
}
const response=await axios.put("/update-book",
  Data,
{headers});
setData({
  itle:"",
price:"",
url:"",
category:"",
desc:""
})
if(response.status===200){
        toast.success(response.data.message)
      }else{
      toast.error(response.data.message)
      }
navigate("/Profile")
  }catch(err){
    alert(err.response.data.message)
  }
}
 
  return(
    <>
      <div className="d-flex text-center  w-100 align-items-center justify-content-center" style={{height:"100vh"}}>
        <div className="dalju flex-column py-5 position-relative p-3" style={{width:"380px",borderRadius:"7px",background:"#ffd6d6",border:"2px solid #e6e5e5"}}>
   <h3 style={{color:"#f94144"}}>Update Product</h3>
      <form
        onSubmit={handleSubmit}
        className="position-relative d-flex  align-items-center flex-column w-100"
        style={{ gap: "9px", marginTop: "30px" }}

      >

          <div className="username position-relative  mt-2">
            <input
              className="iinputt"
              type="text"
            name="title"
            value={Data.title}
            onChange={change}
              required
            />
            <label className="lable" htmlFor="username">
             Product Title
            </label>
          </div>


        <div className="email position-relative  mt-2">
          <input
             className="iinputt"
            type="text"
            name="price"
            value={Data.price}
            onChange={change}
            required
          />
          <label className="lable" htmlFor="text">
            Product Price
          </label>
        </div>

        <div className="password position-relative  mt-2">
          <input
             className="iinputt"
            type="text"
            name="url"
            value={Data.url}
            onChange={change}
            required
          />

          <label className="lable" htmlFor="text">
            Product Url
          </label>



        </div>
         <div className="password position-relative  mt-2">
           <select 
             name="category"
             value={Data.category}
             onChange={change}
             className="" style={{background:"#e3e3e3",outline:"none",border:"none",padding:"10px 15px",borderRadius:"10px",width:"350px"}}>
           <option >Select Product Category</option>{
          cathArr.map((val,id)=>{
            return(
              <option key={id}>
              {val.name}
              </option>
            )
          })
           }
           </select>
         </div>
         <div className="password position-relative  mt-2">
         <textarea
           name="desc"
            value={Data.desc}
            onChange={change}
           placeholder="Product description" style={{color:"black",background:"#e3e3e3",outline:"none",padding:"10px 16px",border:"none",borderRadius:"10px",width:"350px"}}></textarea>
         </div>

        <button type="submit" className="btnn w-100" style={{height:"44px",borderRadius:"7px"}}>
         Update Product
        </button>
      </form>
    </div>
    </div>
    </>
  )
}