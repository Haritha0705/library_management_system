import mongoose from "mongoose";
import {strict} from "node:assert";

const userSchema = new mongoose.Schema({
    name:String,
    email:{type:strict,unique:true},
    password:String,
    role:{type:String,enum:['user','admin'],default:'user'}
})

export default mongoose.model('User',userSchema)