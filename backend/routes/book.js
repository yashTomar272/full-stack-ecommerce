const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const KEY=process.env.KEY;
const {authenticatetoken}=require("./userAuth")
const Book=require("../models/book")


// add book-admin
router.post("/add-book",authenticatetoken,async(req,res)=>{
    try{
        const {title,price,url,category,desc}=req.body;

        const { id } = req.headers;
const user=await User.findById(id);
if(user.role !== "admin"){
    return res.status(400).json({message:"You are not having access to perform admin work"})
}

const book=new Book({

title:title,
price:price,
url:url,
category:category,
desc:desc

})
await book.save();
res.status(200).json({message:"Product added successfully"})
    }catch(err){
      res.status(500).json({ message: "Internal Server Error" });
    }
})

// update books
router.put("/update-book",authenticatetoken,async(req,res)=>{
    try{
const {bookid}=req.headers;
const {title,price,url,category,desc}=req.body;

await Book.findByIdAndUpdate(bookid,{
    title:title,
    price:price,
    url:url,
    category:category,
    desc:desc
})
return res.status(200).json({message:"Product update successfull!"})
    }catch(err){
        console.log("err",err)
      res.status(500).json({ message: "An error occurred" });
    }
})


// delete book
router.delete("/delete-book",authenticatetoken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
await Book.findByIdAndDelete(bookid);
return res.status(200).json({message:"Product Delete successfull!"})

    }catch(err){
        console.log("err",err)
      res.status(500).json({ message: "An error occurred" });
    }
})


// get-all-book
router.get("/get-all-book",async(req,res)=>{
    try{

        const books =await Book.find().sort({createdAt:-1});
        return res.json({
            status:"200",
            data:books,
        })
    }catch(err){
        console.log("err",err)
      res.status(500).json({ message: "An error occurred" });
    }
})

// get-recent-book
router.get("/get-recent-book",async(req,res)=>{
    try{

        const books =await Book.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:"200",
            data:books,
        })
    }catch(err){
        console.log("err",err)
      res.status(500).json({ message: "An error occurred" });
    }
})

// get-book-by-id
router.get("/get-book-by-id/:id",async(req,res)=>{
    try{
const {id}=req.params;

        const books =await Book.findById(id)
        return res.json({
            status:"200",
            data:books,
        })
    }catch(err){
        console.log("err",err)
      res.status(500).json({ message: "An error occurred" });
    }
})

// get-books-by-category
router.get("/get-books-by-category/:category", async (req, res) => {
    try {
        const { category } = req.params;

        // Category ke basis pe books filter karna
        const books = await Book.find({ category: category }).sort({ createdAt: -1 });

        return res.json({
            status: "200",
            data: books,
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Search books route
router.get("/search-books", async (req, res) => {
    try {
      const { query } = req.query;  // Query parameter se search term lena
      const products = await Book.find({
        $or: [
          { title: { $regex: query, $options: "i" } },  // Product title ke liye search
          { category: { $regex: query, $options: "i" } },  // Product category ke liye search
        ]
      }).sort({ createdAt: -1 });  // Latest products ko first show karna
  
      res.json({
        status: "200",
        data: products,  // Products ko response ke roop mein bhejna
      });
    } catch (err) {
      console.log("Error:", err);
      res.status(500).json({ message: "An error occurred" });
    }
  });
module.exports=router