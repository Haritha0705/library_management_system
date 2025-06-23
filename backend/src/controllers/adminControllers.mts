import {Request,Response} from "express";
import jwt from "jsonwebtoken";

const loginAdmin = async (req: Request, res: Response):Promise<any> =>{
    try {
        const {email,password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET as string);
            return res.status(200).json({ success: true, token });
        }else {
            return res.status(400).json({ success: false, message: "Invalid Credentials!" });
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({success: false, message: "Something went wrong", error: error.message,});
    }
}
export {loginAdmin}

