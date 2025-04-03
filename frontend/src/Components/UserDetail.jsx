import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom"
import photo from '../img/2.jpg'
import axios from "axios";

export default function UserDetail(){

  
  const [Data,setData]=useState([]);
   const [date,setDate]=useState([]);
   useEffect(()=>{
     const fetchData=async()=>{
       const response=await axios.get("/get-all-user");
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
  return(
    <><div className="p-5 d-flex table_main flex-column gap-3" style={{overflowX:"scroll",scrollbarWidth:'none',cursor:"pointer"}}>
      <div className="d-flex justify-content-between align-item-center">
      <h4>All User</h4>
        
      </div>
    <table className="w-100" style={{border:"1px solid #ffd6d6"}}>
    <tr>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>S.No.</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}> Name</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Email</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Uid</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Role</th>
    <th className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>Date</th>
    </tr>
    
    {Data &&
          Data.map((item,i)=>(
        <tr  style={{cursor:"pointer"}} key={i}>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{i+1}</td>
          
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item.username}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item.email}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item._id}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}}>{item.role}</td>
          <td className="p-sm-2  p-1" style={{border:"1px solid #ffd6d6"}} >{date[i]}</td>
        
         
        </tr>
         ) )}
          
    </table>
      </div>
    </>
  )
}