const mongoose=require("mongoose");

const book=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    url:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model("books",book);