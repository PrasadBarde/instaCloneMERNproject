const jwt = require("jsonwebtoken");
const {JWTSECRETKEY} = require("../keys");
const mongoose = require("mongoose");
const User =require("../models/user");

module.exports =async (req,res,next)=>{
   //authorization === Bearer token...... 
    const {authorization} =req.headers;
    if(!authorization){
      return  res.status(401).json({message:"you must be logged in "})
    }
const token =await authorization.replace("Bearer ","");
jwt.verify(token,JWTSECRETKEY,(err,payload)=>{
    if(err){
     return   res.status(401).json({message:"you must be logged in"})
    }

    const {_id} =payload;
    User.findById(_id).then(userdata => {
        req.user = userdata;
    next()

    })
})
}