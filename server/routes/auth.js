const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWTSECRETKEY} = require("../keys");
const requireLogin = require('../middleware/requireLogin');


router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "please add all the required fields" });
  }
  //check the user is already present or not
  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existinguser) {
    return res
      .status(400)
      .json({ message: "user is already present,login Insted" });
  }

  //if user is not present already then add the new user details
  let user;
 bcrypt.hash(password,12). then(async(hashedPassword)=>{
    user = new User({
        name,
        email,
        password : hashedPassword,
      });
      try {
        await user.save();
        // console.log(user);
      } catch (error) {
        return console.log(error);
      }
      return res
        .status(201)
        .json({ message: "user is registerd sucessfully", user });
 })

});

router.post("/signin",async (req,res) =>{
    const {email,password} =req.body;
    if(!email || !password){
       return res.status(400).json({
            message:"please add email or password "
        })
    }
    User.findOne({email}).then(savedUser =>{
        if(!savedUser){
          return  res.status(400).json({
            message:"Invalid email or password"
          })
        }
        bcrypt.compare(password,savedUser.password).then(ismatched=>{
            if(ismatched){
                //creating token after login successfuly
            const token =jwt.sign({_id:savedUser._id},JWTSECRETKEY);
             const {_id,name,email} = savedUser;
            return  res.status(200).json({
                    message:"sucessfully sign in",
                    // savedUser
                    user:{_id,name,email},
                    token
                })
            }else{
                return res.status(400).json({
                    message:"Invalid email or password"
                  })
            }
        }).catch((err)=>console.log(err));
    })
})

module.exports = router;
