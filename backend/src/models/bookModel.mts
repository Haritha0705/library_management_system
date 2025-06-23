import * as mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{type:String,required:true},
    category:{type:String,required:true},
    description: { type: String },
    publisher: { type: String },
    publishYear: { type: Number },
    quantity:{type:Number,required:true},
    available:{type:Number,required:true},
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
},{ timestamps: true })

const Book = mongoose.model('book',bookSchema)
export default Book