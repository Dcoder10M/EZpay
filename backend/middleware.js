const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

function authMiddleware(req,res,next) {
    // console.log(req.headers);
    const header=req.headers.token;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const tokenArray=header.split(' ');
    try{
        const decoded=jwt.verify(tokenArray[1],JWT_SECRET)
        // console.log(decoded);
        req.userId=decoded.userId;
        next();
    }catch(e){
        res.status(403).json({});
        return;
    }
}

module.exports={
    authMiddleware
}