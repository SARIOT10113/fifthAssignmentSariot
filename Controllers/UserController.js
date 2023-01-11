const UserModel =require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require( 'bcrypt' );


// GENERATE TOKEN 
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
};

// REGISTRATION USER 
const createUser =async(req,res)=>{
    const {name,email,phone,image,password,bio} = req.body ;
    if(!name || !email || !phone || !image || !password || !bio){
        res.status(400).json({status:"Please fill in the gaps"});
    };
    try { 
        if(password.length < 6){
        res.status(400).json({satatus:"Password must be six charaters"});
        };
        const userExists = await UserModel.findOne({email});
        if(userExists){
            res.status(400).json({status:"email already exists"});
        };
        const user = await UserModel.create({
            name,
            email,
            phone,
            image,
            bio,
            password,
        });
        // GENERATE TOKEN
        const token = generateToken(user._id)
        // SENT HTTPS-ONLY COOKIE
        res.cookie("token",token,{
        path:'/',
        httpOnly:true,
        expires: new Date(Date.now() + 3000 * 86400), // 3 day
        sameSite:"none",
        // secure:true
        })
        await user.save();
        if(user){
        const {_id,name,email,phone,image,bio,token}=user;
        res.status(200).json({
            _id,
            name,
            email,
            phone,
            image,
            bio,
            token,
        })
        }else{
        res.status(400).json({satatus:"account create fail"});
        }
    } catch (error) {
        console.log(error)
    }
};

// LOGIN USER
const userLogin=async(req,res)=>{
    const {email,password}= req.body;
    if(!email || ! password){
        res.status(400).json({satatus:"Invalid details"});
    }
    try {
    const user = await UserModel.findOne({email});
    if(!user){
        res.status(400).json({satatus:"account not found ,Please registration"});
    }
    // PASSWORD MATCH 
    const passwordIsCorrect = await bcrypt.compare(password,user.password);
    // GENERATE TOKEN
    const token = generateToken(user._id)
    // SENT HTTPS-ONLY COOKIE
    res.cookie("token",token,{
        path:'/',
        httpOnly:true,
        expires: new Date(Date.now() + 5000 * 86400), // 5day
        sameSite:"none",
        // secure:true
    })

    if(user && passwordIsCorrect){
        const {_id ,name, phone,image, bio} = user
        res.status(200).json({
            _id,
            name,
            email,
            phone,
            image,
            bio,
            token,
        })
    }else{
        res.status(400).json({satatus:"Invalid email or password"});
    }
    } catch (error) {
        console.log(error)
    }
};

// GET USER DATA
const getUser =async(req,res)=>{
    const user = await UserModel.findById(req.user._id)
    if(user){
        const {_id ,name,email, phone,image , bio } =user;
        res.status(200).json({status:"user data get sucsess",
            _id,
            name,
            email,
            phone,
            image,
            bio,
        })
    }else{
        res.status(400).json({status:"account Not Found"})
    }
};

// UPDATE USER DATA
const updateUser =async(req,res)=>{
    const user = await UserModel.findById(req.user._id);
    if(user){
        const {name,email, phone,image, bio } =user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.image = req.body.image || image;
        user.bio = req.body.bio || bio;
    }
    const updatedUser = await user.save();
    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        phone:updatedUser.phone,
        phone:updatedUser.image,
        bio:updatedUser.bio,
    
    })

};

// LOG OUT USER
const logout =async(req,res)=>{
    res.cookie("token","",{
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        // secure: true,
      });
    res.status(200).json({ message: " success logout" });
};

module.exports ={
    createUser,
    userLogin,
    getUser,
    updateUser,
    logout,
}