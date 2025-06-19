import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUser = async (req:Request,res:Response)=>{
    const users = await User.find();
    res.json((users))
}
