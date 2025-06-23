import * as mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: String, default: "0" },
    gender: { type: String, default: "" },
    phone: { type: String, default: "xxxxxxxxxx" },
    dob: { type: String, default: "xxxx/xx/xx" },
})

const Member = mongoose.model('member',memberSchema)
export default Member