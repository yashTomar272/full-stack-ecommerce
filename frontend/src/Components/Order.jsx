import React, { useEffect,useState } from 'react'
import axios from 'axios'
import photo from '../img/2.jpg'
import { MdCurrencyRupee } from "react-icons/md";
import { use } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader";



function Order() {
  const [Data, setData] = useState([])
  const [date,setDate]=useState([]);
const navigate=useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-orders-history", {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`
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
        setData(response.data.data);
     
      } catch (error) {
        console.error("Error fetching orders:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchOrders();
  }, []);
  
  const TruncateText = ({ text }) => {
    if (text.length <= 10) {
      return   <h6 className='mb-0'>{text}</h6>;
    } else {
      return <h6>{text.substring(0, 20)}...</h6>;
    }
  };
  return (
  <>
  <div className='w-100 h-100 dalju flex-column'>
  {!Data ? <Loader /> : (
    Data.length === 0 ? (
      <div>No Order Yet</div>// Agar Data empty array hai, toh "No Order" dikhana chahiye
    ) : (
          Data &&
          Data.map((item,id)=>(
            <div key={id} >
              
            <div className='User_Second  bg- flex-column d-flex mb-2 '  style={{borderRadius:"9px",border:"2px solid #e6e5e5",maxWidt:"380px"}}>
               <div className="d-flex flex-md-row  flex-column justify-content-around  bg- gap-2 p-3" style={{background:"#ffd6d6",borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>
                 <div className='d-flex gap-3 text-center justify-content-between'>
             <div >
               <h6 className='mb-0'>Order Id</h6>
                 <span>{item._id}</span></div>
                 <div><h6 className='mb-0'>Date</h6>
                 <span>{date[id]}</span></div>
             </div>
                 <div className='d-flex gap-3 text-center justify-content-between'>
                <div> <h6 className='mb-0'>Total Amount</h6>
                 <span><MdCurrencyRupee/>{item.book.price}</span></div>
                  <div><h6 className='mb-0'>Order Status</h6>
                  {item.status=== "Order Placed" &&(
        <span style={{color:"black"}}>{item.status}</span>
      )}
      {item.status=== "Out for Delivery" &&(
        <span style={{color:"blue"}}>{item.status}</span>
      )}
      {item.status=== "Delivered" &&(
        <span style={{color:"green"}}>{item.status}</span>
      )}
      {item.status=== "Canceled" &&(
        <span style={{color:"red"}}>{item.status}</span>
      )}
                  </div>
               </div>
               </div>



              
               <div className='p-3 gap-5 d-flex  w-100 justify-content-around'>

              <div className='d-flex  gap-2 '>
              <div  className=" p-2 dalju"style={{width:"100px",height:"100px",boxShadow:"0px 2px 4px rgba(0,0,0,0.25)",borderRadius:"7px"}}> <img src={item.book.url} onClick={()=>navigate(`/ProductInfo/${item._id}`)} style={{width:"80px",height:"90px",borderRadius:"7px"}}/>
              </div>
                <div className='d-flex flex-column'><TruncateText text={item.book.title} />
                
                <span style={{color:"#c9c5c5"}}> {item.book.category  } </span>
                <span style={{color:"#c9c5c5"}}> x1 </span>
                  </div>

              </div>
                  <h6><MdCurrencyRupee/> {item.book.price}</h6>

               </div>
               </div>
       
    
    </div>
          )))
    )}
            
        
     

        </div>  
  </>
  )
}

export default Order