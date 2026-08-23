import { startSession } from "mongoose"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_SECRET,JWT_EXPIRES_IN} from '../config/env.js'

export const sign_up=async (req,res,next)=>{
    const session=await startSession()
    await session.startTransaction()
    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
            const error=new Error('User already exists');
            error.statusCode=409;
            throw error;}
         const salt=await bcrypt.genSalt(10)
    const hasedPassword=await bcrypt.hash(password,salt)
    const newUsers=await User.create([{name,email,password:hasedPassword}],{session})
        const token=jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{ expiresIn:JWT_EXPIRES_IN })
    
   await  session.commitTransaction()
    session.endSession();
    res.status(201).json({
        success:true,
        message:'User created successfully',
        data:{
            token,
            user:newUsers[0]
        }
    })
}catch(err){
    await session.abortTransaction()
    session.endSession()
    next(err)
}

    }
    export const sign_in
=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        
        const user= await User.findOne({email})
        if(!user){
            const error=new Error();
        error.statusCode=404;
        throw(error)
      
        }
        const IsValidPassword=await bcrypt.compare(password,user.password)
        if(!IsValidPassword){
            const error=new Error();
            error.statusCode=401;
            throw(error)
        }
        const token=jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        res.status(200).json({
            success:true,
            message:"User sign in successfully",
            data:{
                token,
                user
            }
        })

    }
    catch(err){
        next(err)
    }
}
export const sign_out
=(req,res)=>{}