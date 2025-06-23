import * as mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    publisher:{type:String,required:true},
    publishYear:{type:Number,required:true},
    quantity:{type:Number,required:true},
    available:{type:Number,required:true},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
},{ timestamps: true })

const Book = mongoose.model('book',bookSchema)
export default Book