const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const KEY=process.env.KEY;
const {authenticatetoken}=require("./userAuth")


// sing-up
router.post("/signup",async(req,res)=>{
    try{
        const {username,email,password,address}=req.body;
        // check username already exists
const exitinguser=await User.findOne({username:username});
if(exitinguser){
    return res.status(400).json({message:"User name already Exists"})
}
        // check Email already exists
const exitingEmail=await User.findOne({email:email});
if(exitingEmail){
    return res.status(400).json({message:"Email already Exists"})
}

// check password length
if(password.length<=5){
    return res.status(400).json({message:"Password's length should be Greater then 5"})
}

const hashPass=await bcrypt.hash(password,10)
const newuser=new User({
    username:username,
    email:email,
    password:hashPass,
    address:address,
});
const saveuser = await newuser.save();
console.log("saveuser",saveuser);

return res.status(200).json({message:"Register Successfully"})

    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})

// sign-in
router.post("/signin",async(req,res)=>{
try{
const {username,password}=req.body;
console.log("username",username)
console.log("password",password)
const exitingUser=await User.findOne({username});
if(!exitingUser){
    res.status(400).json({message:"Invalid Credentials"})
}
    bcrypt.compare(password, exitingUser.password, (err, data) => {
        if (data) {
            const authClaim = [
                { name: exitingUser.username },
                { role: exitingUser.role }
            ];
            const token = jwt.sign({ authClaim }, KEY,
                { expiresIn: "7d" }
            );
            res.status(200).json({ id: exitingUser._id, role: exitingUser.role, token: token });
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    })

}catch(err){
    res.status(500).json({message:"Internal Server Problem"})
}
})

// get-user-information
router.get("/get-user-information", authenticatetoken, async (req, res) => {
    try {
      const { id } = req.headers; // Ensure `id` is sent in headers
      console.log("id",id)
      if (!id) {
        return res.status(400).json({ message: "User ID is required in headers" });
      }
  
      const data = await User.findById(id).select('-password');
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
    
      return res.status(200).json(data);
    } catch (err) {
      console.error("Error fetching user data:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


//   update address
router.put("/update-address",authenticatetoken,async(req,res)=>{
    try{
        const { id } = req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
      return res.status(200).json({message:"Address Updated SuccessFully"});
    }catch(err){
        res.status(500).json({ message: "Internal Server Error" });

    }
})
router.get("/get-all-user",async(req,res)=>{
    try{

        const user =await User.find();
        return res.json({
            status:"200",
            data:user,
        })
    }catch(err){
        console.log("err",err)
      res.status(500).json({ message: "An error occurred" });
    }
})

module.exports=router; 