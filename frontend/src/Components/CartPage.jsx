


import { useEffect, useState } from "react";


import { loadStripe } from "@stripe/stripe-js";

import { MdDeleteOutline } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import BuyNowModels from "../BuyNowModels";
import axios from "axios";
import Layout from "../Pages/Layout";
import Loader from "./Loader";
import {  toast } from "react-toastify";

export default function CartPage() {
  const navigate=useNavigate();

 const [cartItems,setcartItems]=useState([]);
 const [Total,setTotal]=useState(0);
 useEffect(() => {
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get-to-cart", {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setcartItems(response.data.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };
  fetchCart();
}, [cartItems]);

const deleteItem=async(bookid)=>{
  const response = await axios.put(`/delete-to-cart/${bookid}`,{}, {
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

useEffect(()=>{
  if(cartItems && cartItems.length >0){
    let total=0
    cartItems.map((item)=>{
      total +=item.price;
    })
    setTotal(total);
  }
  else{
    setTotal(0)
  }
},[cartItems])

const PlaceOrder = async () => {
  try {
    const response = await axios.post(
     "/place-orders ",
      { order: cartItems }, 
      {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if(response.status===200){
      toast.success(response.data.message)
    }else{
    toast.error(response.data.message)
    }
    navigate("/");
  } catch (err) {
    console.log("Error:", err); // Error message ko log karo
  }
};



  return (
    <>
      <Layout>
        <div className="Cart_main p-2 container d-flex pb-5 flex-column">
          <h1 className="text-center">Shopping Cart</h1>
          <div className="Cart_main_second d-flex flex-wrap justify-content-center justify-content-lg-between gap-4 mt-3">
            <div className="Cart_First d-flex flex-column gap-4">
              {!cartItems && <Loader/>}
              {cartItems.length === 0 &&
              (
                <h2 className="fst-italic">Product not found</h2>
              )
              }
              {cartItems.length > 0 &&
                <>
                  {cartItems.map((val,id) => {
                    
                    return (
                      <div
                        className="Product_card p-2"
                        key={id}
                        style={{ width: "350px" }}
                      >
                        <div className="d-flex gap-2">
                          <img
                            onClick={() => navigate(`/ProductInfo/${val._id}`)}
                            src={val.url}
                            alt="Product_img"
                            className="img-fluid"
                            style={{ width: "80px",height:"80px" }}
                          />
                          <div>
                            <h4 className="pb-0 mb-0">{val.title}</h4>
                            <span
                              className="d-flex gap-4 mb-0 pb-0"
                              style={{ color: "#d4d3d3" }}
                            >
                              <p className="mb-1">{val.category}</p>
                            </span>
                            <div className="d-flex gap-2">
                              <span>
                                <p className="mb-0 fw-bold fs-6">
                                  <FaIndianRupeeSign /> {val.price}
                                </p>
                              </span>
                              <span>
                                <p
                                  style={{
                                    color: "#34ea34",
                                    marginBottom: "0px",
                                  }}
                                >
                                  5% off
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex mt-3 gap-5">
                          <div className="d-flex gap-2 fw-bold">
                            <button
                           
                              style={{
                                width: "30px",
                                border: "none",
                                fontWeight: "700",
                                fontSize: "15px",
                              }}
                            >
                              -
                            </button>
                           1
                            <button
                         
                              style={{
                                width: "30px",
                                border: "none",
                                fontWeight: "700",
                                fontSize: "15px",
                              }}
                            >
                              +
                            </button>
                          </div>
                          <span
                            style={{ color: "red", cursor: "pointer" }}
                           onClick={()=>deleteItem(val._id)}
                          >
                            <MdDeleteOutline /> Remove
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
             }
            </div>

            <div
              className="Cart_second d-flex flex-column gap-3 p-2"
              style={{ width: "382px" }}
            >
              <span style={{ borderBottom: "1px solid #737373" }}>
                <h5>Price Details</h5>
              </span>
              <div className="d-flex flex-row justify-content-between mb-0">
                <p className="mb-0">Price ({cartItems.length} item)</p>{" "}
                <p className="mb-0">
                  <FaIndianRupeeSign /> {Total}
                </p>
              </div>

              <div className="d-flex flex-row justify-content-between mb-0">
                <p className="mb-0">Delivery Charges</p>{" "}
                <p className="mb-0" style={{ color: "#34ea34" }}>
                  Free
                </p>
              </div>
              <div className="d-flex flex-row justify-content-between mb-0">
                <h5 className="mb-0">Total Amount</h5>{" "}
                <h5 className="mb-0">
                  <FaIndianRupeeSign />{Total}
                </h5>
              </div>
              

{
  cartItems.length>0 &&
  (
    <button onClick={PlaceOrder} className='btnn w-100 rounded' style={{ height: "47px" }}>Buy now</button>
  )
}

            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
