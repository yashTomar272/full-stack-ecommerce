
import React, { useEffect, useState } from "react";
import { GrCart } from "react-icons/gr";
import { RiSearchLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logooo.png";
import {useSelector} from "react-redux"
import axios from "axios";


export default function Navbar() {
  
  const [activeSection, setActiveSection] = useState(""); // Managing active sections
  const [search, setSearch] = useState("");  // Search term ko track karne ke liye
  const [searchResults, setSearchResults] = useState([]);  // Products ko store karne ke liye


  const navigate=useNavigate()
 
  const [cartItems,setcartItems]=useState([]);
  
  useEffect(() => {
   const fetchCart = async () => {
     try {
       const response = await axios.get("/get-to-cart", {
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

  const handleToggleSection = (section) => {
    if (section === "cart") {
      // navigate("/CartPage"); // Navigate to CartPage on cart icon click
    }
    setActiveSection((prevSection) => (prevSection === section ? "" : section));
  };

  const handleNavigation = (path) => {
    setActiveSection(""); // Close all sections when navigating
    // navigate(path);
  };

  
const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
const role=useSelector((state)=>state.auth.role);

const handleSearchChange = (event) => {
  setSearch(event.target.value);
};

useEffect(() => {
  const fetchSearchResults = async () => {
    if (search) {  // Agar search term available hai
      try {
        const response = await axios.get(`/search-books?query=${search}`);
        setSearchResults(response.data.data);  // Response se products ko set karna
        console.log("hello",response.data.data);  // Response se products ko set karna

      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);  // Agar search empty hai, to results ko clear karna
    }
  };

  fetchSearchResults();
}, [search]);  // Jab bhi search term change hoga, fetchSearchResults run hoga


const TruncateText = ({ text }) => {
  if (text.length <= 10) {
    return <span>{text}</span>;
  } else {
    return <h6>{text.substring(0, 16)}...</h6>;
  }
};
  return (
    <>
      <div
        className="Header_main position-relative d-flex justify-content-around bg align-items-center"
        style={{
          boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
          background: "radial-gradient(#fff,#ffd6d6)",
        }}
      >
        <img
          src={logo}
          alt="logo_img"
          className="img-fluid m-0 p-0 nav_logo"
          style={{ maxWidth: "250px" }}
          onClick={()=>navigate("/")}
        />
{/* heldfdf */}
        <div
          className={` ${activeSection === "menu" ? "show" : "d-none d-lg-block "} `}
        >
          <ul
            className={` ${activeSection === "menu" ? "Column " : "Header_ul"} dalju mt-3 gap-5 p-3 `}
            style={{ listStyleType: "none", cursor: "pointer" }}
          >
            <li>
              <Link to={"/"} onClick={() => handleNavigation("/")} className="Link">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/AllProduct"
                // onClick={() => handleNavigation("/AllProduct")}
              >
                {" "}
                All Product
              </Link>
            </li>
            <li>
              <Link
                to={"/AllProduct"}
                onClick={() => handleNavigation("/AllProduct")}
              >
                {" "}
              About us
              </Link>
            </li>
            {isLoggedIn &&
            <li>
            <Link to={"/Profile"}>
            {isLoggedIn && role === "admin" ?
            "Admin Profile":" Profile"}
           
            </Link>
           </li>
            }
           
           
          </ul>
        </div>
        {!isLoggedIn &&
          <div className="d-flex gap-2">
          <button className="Login_text">
  <Link to="/Login" className="Link">
  Login
  </Link>
                </button>
              <button className="SignUp_text">
               <Link to="/Signup" className="Link text-dark">
               SignUp
               </Link>
                </button>
          </div>
        }
      

        <ul
          className="Header_ull d-flex align-items-center gap-4 mt-2 p-0 position-relative "
          style={{ listStyleType: "none", cursor: "pointer" }}
        >
           {isLoggedIn &&
              <li
              className="fs-4 position-relative"
              onClick={() => {
                handleToggleSection("cart"); 
                navigate("/CartPage"); // Navigate function ka use karo
              }}
            >
              <GrCart />
              <p
                className="text-primary"
                style={{
                  position: "absolute",
                  bottom: "3px",
                  left: "8px",
                  fontSize: "17px",
                }}
              >
            {cartItems.length} 
            
              </p>
            </li>
           }
       
          <li className="fs-4 position-relative">
            <RiSearchLine onClick={() => handleToggleSection("search")} />
            {activeSection === "search" && (
              <div
                style={{
                  boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
                  position: "absolute",
                  top: "190%",
                  right: "-80px",
                  zIndex: "1000",
                  borderRadius: "10px",
                }}
              >
                <input
                  value={search}
                  type="search"
                  placeholder="Search......"
                  className="d-flex justify-content-center search"
                  onChange={handleSearchChange}
                />

{search && (
                  <div
                    className="d-flex flex-column mt-1 p-3 gap-2"
                    style={{
                      width: "370px",
                      background: "#e3e3e3",
                      borderRadius: "10px",
                    }}
                  >
                    {searchResults.length > 0 ? (
                      <>
                        {searchResults.map((val, id) => {
                          return (
                            <span
                              className="d-flex gap-3 align-items-center "
                              key={id}
                              onClick={() => navigate(`/ProductInfo/${val._id}`)}
                            >
                              <img
                                src={val.url}
                                style={{ width: "43px", aspectRatio: "1" }}
                              />
                              <TruncateText text={val.title} />
                            </span>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <span className="d-flex justify-content-center">
                          <img
                            src="https://www.kpriet.ac.in/asset/frontend/images/nodata.png"
                            style={{ width: "170px", height: "80px" }}
                          />
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
          <li onClick={() => handleToggleSection("menu")}>
            {activeSection === "menu" ? (
              <RxCross2 size={30} className="text-dark d-block d-lg-none" />
            ) : (
              <FaBars size={30} className="text-dark d-block d-lg-none" />
            )}
          </li>
        </ul>
      </div>
    </>
  );
}


