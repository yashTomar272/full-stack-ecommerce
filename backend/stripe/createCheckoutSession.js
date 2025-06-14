const router=require("express").Router();
const Stripe = require("stripe");


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
   try{
    const { cartItems } = req.body;
  console.log("cartItems",cartItems);
  
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.url],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));
    const successUrl = `https://full-stack-ecommerce-xyd9.vercel.app/success?cartItems=${encodeURIComponent(JSON.stringify(cartItems))}`;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: "https://full-stack-ecommerce-xyd9.vercel.app/cancel",
    });
  
    res.json({
      id: session.id,
      status: "200"
    });
    
   }catch(err){
 console.log("Error:", err);
      res.status(500).json({ message: "An error occurred" });
   }
  });
  module.exports=router
