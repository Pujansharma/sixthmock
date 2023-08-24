const express=require("express");
const {userdata}=require("../model/usermodel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userRoutes=express.Router();

userRoutes.post("/api/register", async(req,res)=>{
    try {
        const {username,avatar,email,password}=req.body;
        const hashpass=await bcrypt.hash(password, 10);
        const user=new userdata({username,avatar,email,password:hashpass});
        await user.save();
        res.status(200).send("register succesfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
})


//login user
userRoutes.post("/api/login", async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userdata.findOne({email});
        if(!user){
            res.status(401).send("Invaild credentails");
            return;
        }
        const passvaild=await bcrypt.compare(password,user.password);
         if(!passvaild){
            res.status(401).send("Invaild credentails");
            return;
         }
         const token=jwt.sign({userId:user._id},"masai");
         res.json({token})
    } catch (error) {
        res.status(500).send("error login");
    }
})

module.exports={userRoutes}