const express = require("express");
const { Router } = require("express");
const { userRouter } = require("./user");
const { accountRouter } = require("./account");
const router = Router();

router.use("/user",userRouter);
router.use("/account",accountRouter);

router.get("/",function(req,res){
    res.status(200).json({
        msg:"Router working successfully"
    })
})

module.exports={router}