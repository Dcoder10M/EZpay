const { Router } = require("express");
const zod=require('zod');
const { User, Account } = require("../db");
const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter=Router();

const zodSchema=zod.object({
	username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

userRouter.get("/",(req, res) => {
    res.json({success:true});
})

userRouter.post("/signup",async function(req,res){
    const verified=zodSchema.safeParse(req.body);
    const data=await User.findOne({
        username:req.body.username
    });
    if(!verified.success || data!==null){
        // console.log("inside");
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
        return;
    }

    const newUser=await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })

    // console.log(newUser._id);
    await Account.create({
        userId:newUser._id,
        balance:Math.round(Math.random()*9999)+1
    })
    const token=jwt.sign({
        userId:newUser._id
    },JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
	    token: token
    })
})

userRouter.post("/signin",async (req, res) => {
    const userData=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!userData){
        res.status(411).json({
            message: "Error while logging in"
        });
        return;
    }
    const token=jwt.sign({
        userId:userData._id
    },JWT_SECRET);
    res.status(200).json({
        token
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
}).strict();

userRouter.put("/",authMiddleware,async function(req, res) {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
        return;
    }
    try{
        await User.findByIdAndUpdate(req.userId,req.body)
        res.status(200).json({
            message: "Updated successfully"
        });
    }catch(e){
        res.status(411).json({
            message: "Error while updating information"
        });
    }
})

userRouter.get("/bulk",async (req,res)=>{
    const friendName= req.query.filter||"";
    const friendList=await User.find({
        $or: [{
            firstName: {
                "$regex": friendName,
                "$options": 'i'
            }
        }, {
            lastName: {
                "$regex": friendName,
                "$options": 'i'
            }
        }]
    })
    console.log(friendList)
    res.status(200).json({
        user: friendList.map((friend)=>({
            firstName:friend.firstName,
            lastname:friend.lastName,
            _id:friend._id,
        }))
    })
})

module.exports={userRouter};
