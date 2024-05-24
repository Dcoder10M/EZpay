const express = require("express");
const app=express();
const {router}=require("./routes/index.js");
const cors=require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1",router);

app.get("/",function(req,res) {
    res.json({success:true})
})

app.listen(3000,function(req,res) {
    console.log("Backend connected");
})


