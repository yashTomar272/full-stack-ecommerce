const mongoose=require("mongoose");
const CONN_URL=process.env.CONN_URL
mongoose.connect(CONN_URL).then(()=>{
    console.log("database connecting successfully")
})
.catch((err)=>{
    console.log("database not connecting ",)
})