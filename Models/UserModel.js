const mongoose = require('mongoose');
const bcrypt = require( 'bcrypt' );
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add your name'],
        min:[5,'name min length 5 charaters'],
        max:[30,'name max length 30 charaters'],
    },
    email:{
        type:String,
        required:[true,'Please add your email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
          ],
    },
    phone:{
        type:String,
        required:[true,'Please add your phone'],
    },
    image:{
        type:String,
        required:[true,'Please add your image'],
    },
    bio:{
        type:String,
        required:[true,'Please add your bio'],
    },
    
    password:{
        type:String,
        required:[true,'Please add your image'],
        min:[6,'password min length 6 charaters'],
        max:[20,'password max length 20 charaters'],
    },
},{versionKey: false},{timestamps: false});

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(this.password,salt);
    this.password = hashPassword;
    next();

});

const UserModel = mongoose.model('users',UserSchema);
module.exports = UserModel