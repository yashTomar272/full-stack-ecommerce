// Success.jsx
import React from 'react';
import gif from '../img/cancel.jpg'
import { useNavigate } from 'react-router-dom';
export default function Cancel() {
  const navigate=useNavigate()
  return (
    <>
    <div className='dalju w-100 h-100 flex-column flex-center'>
 <img src={gif} alt="gif_img" className="img-fluid" style={{height:"400px",aspectRatio:"1"}}/>
 <h2>Your Payment Was Cancelled</h2>
 <button className="btn fs-4 px-3 py-1 rounded-pill text-white" style={{background:"rgb(228, 93, 53)"}} onClick={()=>navigate("/")}>Home</button>
    </div>
    </>
  )
}
