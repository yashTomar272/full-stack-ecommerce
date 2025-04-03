import React, { useEffect,useState } from 'react'
import Home from './Pages/Home'
import Order from './Components/Order'
import Setting from './Components/Setting'
import AllProduct from './Components/AllProduct';
import Favourites from './Components/Favourites';
import Loginpage from './Components/Loginpage';
import Signup from './Components/Signup';
import ProductInfo from './Components/ProductInfo';
import AdminDashboard from './Components/AdminDashboard';
import "bootstrap/dist/css/bootstrap.css";
 import "bootstrap/dist/js/bootstrap.bundle.js";
import "./App.css"
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Profile from './Components/Profile';
import CartPage from './Components/CartPage';
import AddProductPage from './Components/AddProductPage';
import UpdateProductPage from './Components/UpdateProductPage';
import ProductByCath from './Components/ProductByCath';
import WelcomePage from './Components/WelcomePage';
import Nopage from './Components/Nopage';

function App() {
  const dispatch=useDispatch();
  const role = useSelector((state)=>state.auth.role);
 useEffect(()=>{
 if(localStorage.getItem("id") && 
 localStorage.getItem("token") &&
 localStorage.getItem("role") 
){
dispatch(authActions.login())
dispatch(authActions.changeRole(localStorage.getItem("role")))
}
 },[])


 
 const [showWelcomePage, setShowWelcomePage] = useState(true);
   useEffect(() => {
     const timer = setTimeout(() => {
       setShowWelcomePage(false);
     }, 3000); // 3000 milliseconds = 3 seconds
     return () => clearTimeout(timer); // Cleanup timer on unmount
   }, []);
 
  return (

   <>
               <ToastContainer position="top-right" autoClose={2000} />

     < Routes>

<Route exact path="/"  element={showWelcomePage ? <WelcomePage />: <Home/>} />
<Route  path="/AllProduct" element={ <AllProduct/>} />
<Route  path="/Login" element={ <Loginpage/>} />
<Route  path="/Signup" element={ <Signup/>} />
<Route path="/*" element={<Nopage />} />
<Route  path="/CartPage" element={ <CartPage/>} />
<Route path="/Profile" element={<Profile />}/>
<Route path="/AddProductPage" element={<AddProductPage />}/>
<Route path="/ProductByCath/:category" element={<ProductByCath />}/>
<Route path="/UpdateProductPage/:id" element={<UpdateProductPage />}/>
{role==="admin" ?(
<Route  path="/AdminDashboard" element={ <AdminDashboard/>} />
      
    ):(
<Route path="/*" element={<Nopage />} />

    )}

 

<Route  path="/ProductInfo/:id" element={ <ProductInfo/>} />

     
     </Routes>
   </>
    
    
  )
}


export default App


