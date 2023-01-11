const jwt = require('jsonwebtoken')
const UserModel = require('../Models/UserModel');

const Authentication =async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
        res.status(401).json({ message: "Not authorized, please login"});
        }
        // verify token
        const verified = jwt.verify(token,process.env.JWT_SECRET);;
        // GET USER ID FROM TOKEN 
        const user = await UserModel.findById(verified.id).select("-password")
        if(!user){
            if (!user) {
                res.status(401).json({ message: "user not found" });
              }
        }
        req.user = user ;
        next()
    } catch (error) {
        res.status(400).json({ message: "Not authorized, please login" });
    }
};


module.exports = Authentication