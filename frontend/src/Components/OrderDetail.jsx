


import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from "axios";
import { useEffect,useState } from 'react';
import { FaCheck } from "react-icons/fa6";
import {  toast } from "react-toastify";

export default function (){
  const [Data,setData]=useState([]);
  const [date,setDate]=useState([]);
 const [Options,setOptions]=useState();
const [Values, setValues] = useState({status:""})
console.log("data",Data)
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await axios.get("/get-all-orders",{
        headers:{
          id:localStorage.getItem("id"),
          authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });
      const datesArray = response.data.data.map((book) => {
       return new Date(book.createdAt).toLocaleDateString("en-US", {
         month: "short",
         day: "2-digit",
         year: "numeric"
       });
     });
   setDate(datesArray)
   console.log("hello",response.data.data)
      setData(response.data.data);
    }
    fetchData();
  },[Data])
  const setOption=async(i)=>{
    setOptions(i)
  }
  const change=(e)=>{
    setValues({status:e.target.value})
    
  }
  const submitChange=async(i)=>{
const id = Data[i]._id;
const response=await axios.put(`/update-status/${id}`,
  Values,{
    headers:{
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
  })
   if(response.status===200){
          toast.success(response.data.message)
        }else{
        toast.error(response.data.message)
        }
  }
  return(
    <><div className="p-5 table_main d-flex flex-column gap-3"  style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
      <div className="d-flex justify-content-between align-item-center">
      <h4>All Order</h4>
      
      </div>
    <table className="w-100 " style={{border:"1px solid #ffd6d6"}} >
    <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Order Id</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Image</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Title</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Cathogary</th>
    
  
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>TotalPrice</th>
    
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>UserName</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Adress</th>
    
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Email</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Date</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Status</th>
    </tr>

{
  Data &&
  Data.map((val,i)=>(
    <tr >
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{i+1}</td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}> {val.book ? val._id : "N/A"}</td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}><img src={val.book.url} style={{width:"40px",aspectRatio:"1"}}/></td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{val.book.title}</td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{val.book.category    }</td>
   
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}><FaIndianRupeeSign/>{val.book.price}</td>
 
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{val.user.username}</td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{val.user.address}</td>
   
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{val.user.email}</td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{date[i]}</td>
    <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}} onClick={()=>setOption(i)}>
      {val.status=== "Order Placed" &&(
        <span style={{color:"yellow"}}>{val.status}</span>
      )}
      {val.status=== "Out for Delivery" &&(
        <span style={{color:"blue"}}>{val.status}</span>
      )}
      {val.status=== "Delivered" &&(
        <span style={{color:"green"}}>{val.status}</span>
      )}
      {val.status=== "Canceled" &&(
        <span style={{color:"red"}}>{val.status}</span>
      )}
      {
        Options === i &&
        (
          <div className="d-flex">
 <select name="status" onChange={change} value={Values.status}>
          {["Order Placed", "Out for Delivery", "Delivered", "Canceled"].map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
        <button style={{color:"red",outline:"none",border:"none"}} onClick={()=>submitChange(i)}>
       < FaCheck/>
          </button>
          </div>

    
        )
      }
   

    </td>
</tr>
  ))
}

     
                
                
             

    </table>
      </div>
    </>
  )
}