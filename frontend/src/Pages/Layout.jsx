import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from '../Components/AdminDashboard'

export default function Layout({children}){
  const role = useSelector((state)=>state.auth.role);
 
  return(
<>
  
{role==="user"&&(
  <>
  <Navbar/>
  <div className="main-container">
   {children}
 </div> 
 <Footer/> 
 </>
)}
{role==="admin"&&(
  <AdminDashboard/>
)}
    

</>
  )
}