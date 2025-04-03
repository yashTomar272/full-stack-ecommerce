import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import Loader from "./Loader";
import {  toast } from "react-toastify";

function Favourites() {
  const navigate = useNavigate();
  const [Fav, setFav] = useState([]);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await axios.get("/get-to-fav", {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFav(response.data.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    fetchFav();
  }, []);

  const handleRemoveProduct = async (bookId) => {
    try {
      const response = await axios.put(
        "/delete-to-fav",
        {},
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
            bookid: bookId,  // Pass correct bookId
          },
        }
      );
      if(response.status===200){
             toast.success(response.data.message)
           }else{
           toast.error(response.data.message)
           }

      // Remove the book from the state to update UI instantly
      setFav((prevFav) => prevFav.filter((item) => item._id !== bookId));
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className='Card_main d-flex flex-wrap w-100 p-3 flex-column position-relative align-items-center justify-content-center'>
     {!Fav && <Loader />}
      {Fav.length === 0 && <div>No Favourite Products</div>}
      
      <div className="d-flex gap-4 flex-wrap justify-content-center align-items-center w-100">
        {Fav.map((item, i) => (
          <div key={i} className="card position-relative" style={{ width: "18rem", height: "410px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
            <div className="h-50 w-100 dalju p-1" onClick={() => navigate(`/ProductInfo/${item._id}`)}>
              <img className="card-img-top h-100 w-100" src={item.url} alt="Card image cap" style={{ objectFit: "contain" }} />
            </div>
            <div className="card-body position-relative" style={{ cursor: "pointer" }}>
              <p className="card-title" style={{ color: "gray" }}>Buy Smart</p>
              <h6 className="card-text">{item.title}</h6>
              <h5><MdCurrencyRupee />{item.price}</h5>
              <button
                className="btnn fw-bold w-100 mt-2"
                style={{ borderRadius: "6px", height: "40px" }}
                onClick={() => handleRemoveProduct(item._id)}
              >
                Remove from Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
