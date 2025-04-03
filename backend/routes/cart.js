const router=require("express").Router();
const User=require("../models/user");
const {authenticatetoken}=require("./userAuth")


//add to cart


router.put("/add-to-cart",authenticatetoken,async(req,res)=>{
    try{
const {bookid,id}=req.headers;
const userdata=await User.findById(id);
const isbookcart=userdata.cart.includes(bookid);
if(isbookcart){
    return res.status(200).json({ message: "Product is already in cart" });
}
await User.findByIdAndUpdate(id,{$push:{cart:bookid},})
return res.status(200).json({ message: "Product added to cart" });
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})



// Show all cart books
router.get("/get-to-cart", authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userdata = await User.findById(id).populate("cart");
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        // Reverse without modifying original array
        const cartBooks = [...userdata.cart].reverse();

        return res.status(200).json({
            status: "success",
            data: cartBooks
        });

    } catch (err) {
        res.status(500).json({ message: "An error occurred" });
    }
});

//delete to cart
router.put("/delete-to-cart/:bookid",authenticatetoken,async(req,res)=>{
    try{
        const {bookid}=req.params;
const {id}=req.headers;

await User.findByIdAndUpdate(id,{$pull:{cart:bookid},})
return res.status(200).json({ message: "Product remove  to cart" });
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})




module.exports=router;