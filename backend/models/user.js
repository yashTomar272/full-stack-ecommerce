const mongoose=require("mongoose");


const user=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
       default:"https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"books"
    }],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"books"
    }],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"order"
    }],
},{timestamps:true})

module.exports=mongoose.model("user",user);