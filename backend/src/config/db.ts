import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log('MongoDB connected');
    }catch (e) {
        console.error('MongoDB connection error:', e);
        process.exit(1);
    }
}

export default connectDB;