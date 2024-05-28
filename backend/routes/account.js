const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const zod=require('zod')
const accountRouter=Router();
const mongoose=require('mongoose')

accountRouter.get("/balance",authMiddleware,async (req, res) => {
    const userData=await Account.findOne({
        userId:req.userId
    });
    res.status(200).json({
        balance:userData.balance
    })
})


accountRouter.post("/transfer",authMiddleware,async (req, res) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const receiver=await Account.findOne({
            userId:req.body.to
        });
        if(!receiver){
            res.status(400).json({
                message: "Invalid account"
            });
            return;
        }
        const sender=await Account.findOne({
            userId:req.userId
        })
        if(sender.balance<req.body.amount){
            res.status(400).json({
                message: "Insufficient balance"
            });
            return;
        }
    
        await Account.updateOne({
            userId:req.body.to
        },{
            $inc:{
                balance:req.body.amount
            }
        })
        await Account.updateOne({
            userId:req.userId
        },{
            $inc:{
                balance:-req.body.amount
            }
        })
        
        await session.commitTransaction()
        session.endSession()
        
        res.status(200).json({
            message: "Transfer successful"
        }); 
    }catch (err) {
        await session.abortTransaction()
        session.endSession()
        console.log(err)
        res.status(500).send('Error');
        return;
    }
})

module.exports={
    accountRouter
}