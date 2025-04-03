const router=require("express").Router();
const Book=require("../models/book");
const Order=require("../models/order");
const {authenticatetoken}=require("./userAuth")
const User = require('../models/user')
//order place
router.post("/place-orders", authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;
        console.log("User ID:", id); // Debugging

        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const { order } = req.body;
        console.log("Order Received:", order); // Debugging

        if (!order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({ message: "Order array is empty or invalid" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderIds = [];

        for (const orderData of order) {
            if (!orderData._id) {
                console.log("Invalid order data:", orderData);
                return res.status(400).json({ message: "Invalid order data" });
            }

            // Create a new order
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();
            orderIds.push(orderDataFromDb._id);

            // Save order in user's orders
            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });

            // Remove from cart
            await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
        }

        return res.json({
            status: "success",
            message: "Order placed successfully",
            orders: orderIds
        });

    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ message: "An error occurred" });
    }
});


// GET user history of particular user
router.get("/get-orders-history", authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Fetch user and populate orders with books
        const userData = await User.findById(id).populate({
            path: "orders",  // Make sure "orders" exists in the User schema
            populate: { path: "book" },  // Ensure "book" matches the field name in Order schema
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: orderData,
        });

    } catch (err) {
        console.error("Error fetching order history:", err.message);  
        console.error("Stack Trace:", err.stack);  

        res.status(500).json({ 
            message: "An error occurred", 
            error: err.message,  
        });
    }
});

// router.get("/get-orders-history",authenticatetoken,async(req,res)=>{
//     try{
// const {id}=req.headers;
// const userData=await User.findById(id).populate({
//     path:"orders",
//     populate:{path:"books"},
// })
// const orderData=userData.orders.reverse();
// return res.json({
//     status:"success",
//     data:orderData,
// })
//     }catch(err){
//         res.status(500).json({ message: "An error occurred" });
//     }
// })   
// get all order 
router.get("/get-all-orders", authenticatetoken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("book user") // Combined for efficiency
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            data: orders
        });

    } catch (err) {
        console.error("Error fetching orders:", err); // Added error logging
        return res.status(500).json({ message: "An error occurred" });
    }
});


// update order admin
router.put("/update-status/:id",authenticatetoken,async(req,res)=>{
    try{
const {id}=req.params;
await Order.findByIdAndUpdate(id,{status:req.body.status});
return res.json({
    status:"success",
    message:"status update successfully"
})
    }catch(err){
        res.status(500).json({ message: "An error occurred" });
    }
})
module.exports=router;