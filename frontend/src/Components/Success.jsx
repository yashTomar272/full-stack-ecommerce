import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from 'react';
import gif from '../img/success.gif';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;
  const [cartItems, setcartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ New state to avoid duplicate

  // 1. Fetch Cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${URL}/get-to-cart`, {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setcartItems(response.data.data); // ✅ Set cart items
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to fetch cart data.");
      }
    };

    fetchCart();
  }, []);

  // 2. Place order only once after cartItems is loaded
 
    const placeOrder = async () => {
      if (cartItems.length === 0 || orderPlaced) return;

      try {
        const response = await axios.post(`${URL}/place-orders`,
          { order: cartItems },
          {
            headers: {
              id: localStorage.getItem("id"),
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          setOrderPlaced(true); // ✅ prevent repeat call
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Order placement error:", error);
        toast.error("Failed to place order.");
      }
      navigate("/");
    };

  

  return (
    <div className='dalju w-100 h-100 flex-column flex-center'>
      <img src={gif} alt="gif_img" className="img-fluid" />
      <h2>Your Payment Was Successful.</h2>
      <button
        className="btn fs-4 px-3 py-1 rounded-pill text-white"
        style={{ background: "rgb(31, 212, 40)" }}
        onClick={placeOrder}
      >
        Home
      </button>
    </div>
  );
}
