
import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom"
import photo from '../img/2.jpg'
import axios from "axios";
import {  toast } from "react-toastify";

export default function ProductDetail(){
   const navigate=useNavigate();
   const [Data,setData]=useState([]);
   const [date,setDate]=useState([]);
   useEffect(()=>{
     const fetchData=async()=>{
       const response=await axios.get("http://localhost:8000/get-all-book");
       const datesArray = response.data.data.map((book) => {
        return new Date(book.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric"
        });
      });
    setDate(datesArray)
       setData(response.data.data);
     }
     fetchData();
   },[])
   
   const deleteProduct=async(idd)=>{
    const response=await axios.delete("/delete-book", {
      headers: {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: idd,  // Pass correct bookId
      },
    })
   if(response.status===200){
           toast.success(response.data.message)
         }else{
         toast.error(response.data.message)
         }
    navigate("/")
   }
  return(
    <><div className=" d-flex flex-column gap-3 table_main"  style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
      <div className="d-flex justify-content-between align-item-center">
      <h4>All Product</h4>
        <Link to={'/AddProductPage'}>
          <button className="btn" style={{background:"#ffe5ec",border:"1px solid pink"}}>Add Product</button>
        </Link>
      </div>
    <table className="w-100" style={{border:"1px solid #ffd6d6"}}>
    <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Product Image</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Product title</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Product Price</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Product Category</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Product date</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Action</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Action</th>
    </tr>
    {Data &&
          Data.map((item,i)=>(
        <tr  style={{cursor:"pointer"}} key={i}>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{i+1}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>
            <img src={item.url} alt="product_img" style={{width:"40px",aspectRatio:"1",borderRadius:"3px"}}  />
          </td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item.title}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item.price}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item.category}</td>
          
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}} >{date[i]}</td>
        
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6",color:"Lightgreen"}} onClick={() => {
             
              navigate(`/UpdateProductPage/${item._id}`);
            }}>Edit</td>
           <td className="p-sm-2  p-1" style={{ border: "1px solid #ffd6d6", color: "red" }} onClick={()=>deleteProduct(item._id)}>Delete</td>
        </tr>
         ) )}
    
    </table>
      </div>
    </>
  )
}