const router=require("express").Router();
const User=require("../models/user");
const {authenticatetoken}=require("./userAuth")


//add book to favourite
router.put("/add-to-fav", authenticatetoken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userdata = await User.findById(id);
        
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }

        const isbookfav = userdata.favourites.includes(bookid);
        
        if (isbookfav) {
            return res.status(200).json({ message: "Product is already in favourite list" }); // ✅ Stops execution
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });

        return res.status(200).json({ message: "Product added to favourites" }); // ✅ Return here too
    } catch (err) {
        return res.status(500).json({ message: "An error occurred" }); // ✅ Ensure return on error
    }
});


// delete book to favourite
router.put("/delete-to-fav",authenticatetoken,async(req,res)=>{
    try{
const {bookid,id}=req.headers;
const userdata=await User.findById(id);
const isbookfav=userdata.favourites.includes(bookid);
if(isbookfav){
    await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
}
res.status(200).json({ message: "Product delete from favourites" });
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})

// show all favourite books
router.get("/get-to-fav",authenticatetoken,async(req,res)=>{
    try{
const {id}=req.headers;
const userdata=await User.findById(id).populate("favourites");
const favouritebook= userdata.favourites;

res.status(200).json({ 
    status:"seccess",
    data:favouritebook
});
    }catch(err){
      res.status(500).json({ message: "An error occurred" });
    }
})



module.exports=router;
