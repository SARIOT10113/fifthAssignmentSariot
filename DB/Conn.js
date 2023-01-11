const mongoose = require('mongoose');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

mongoose.connect(process.env.DATABASE ,{autoIndex:true}).then(()=>{
    console.log('MongoDB database connection successfully')
}).catch((error)=>{
    console.log('MongoDB database connection fail',error)
})