// import React from 'react'
// import { loadStripe } from "@stripe/stripe-js";

// const Hello = () => {
//   const URL = process.env.REACT_APP_URL;
   

//     const stripePromise = loadStripe("pk_test_51Qf1VfRvKnbQ5boup1Z0bzdNFrFI5TA3pIpEPWszraHDPe6yGcFFQRLXL1ZbwSNTGn1C7xfwtmzYn86poVC5GEd800bwUaccBc");
//     const handleCheckout = async () => {
//       const stripe = await stripePromise;
    
//       // 🔽 Manual single product item
//       const cartItems = [
//         {
//           title: "Test Product",
//           image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?cs=srgb&dl=assortment-book-bindings-books-1130980.jpg&fm=jpg", // koi bhi image URL
//           price: 499, // in INR
//           quantity: 1,
//         },
//       ];
    
//       const response = await fetch("http://localhost:8000/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cartItems }), // yeh manually bheja gaya
//       });
    
//       const session = await response.json();
    
//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });
    
//       if (result.error) {
//         alert(result.error.message);
//       }
//     };
    
      
//   return (
//     <button onClick={handleCheckout} className='btn bg-danger'>Shop Now</button>
//   )
// }

// export default Hello