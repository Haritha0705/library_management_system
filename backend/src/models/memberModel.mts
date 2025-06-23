import * as mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: String,},
    gender: { type: String},
    phone: { type: String},
    dob: { type: String},
},{ timestamps: true })

const Member = mongoose.model('member',memberSchema)
export default Member