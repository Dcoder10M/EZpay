const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const User=mongoose.model('User',userSchema);

const accountSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account=mongoose.model('Account',accountSchema);

mongoose.connect("mongodb+srv://divyanshu10m:divyanshu.10m@cluster0.gac3qtx.mongodb.net/EZpay")
.then(()=>{
    console.log("Connected to DB");
}).catch((e)=>{
    console.log("Error while connecting to DB "+e);
})

module.exports={
    User,
    Account
}