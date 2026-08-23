import { Timestamp } from 'mongodb';
import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"User name is required"],
        trim:true,
        minLength:2,
        maxLength:50
        },
    email:{
        type:String,
        required:[true,"User email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please provide a valid email address"]},
    password:{
        type:String,
        required:[true,"User password is required"],
        minLength:6,
    }
},{timestamps:true});
const User=mongoose.model('User',userSchema);//model name is singular and the first letter is capitalized and mongoose will automatically create a collection with plural name
export default User;