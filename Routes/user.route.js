const express=require("express")
const { UserModel } = require("../models/user.model")

const userRoute=express.Router()



userRoute.post("/register",async(req,res)=>{
    const {userName,email}=req.body

    try {
       const userExits=await UserModel.findOne({email})

       if(userExits) return res.status(200).send({message:"User Exists"})

       const newUser=new UserModel({...req.body})
       await newUser.save()
       res.status(200).send({message:"New User added",newUser})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})
userRoute.get("/user",async(req,res)=>{
    try {
       const userExits=await UserModel.find()
       res.status(200).send(userExits)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})



module.exports={userRoute}