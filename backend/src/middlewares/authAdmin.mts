import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { atoken } = req.headers;

        // Check if token is present and is a string
        if (!atoken || typeof atoken !== "string") {
            res.status(400).json({ success: false, message: "No token found" });
            return;
        }

        // Decode JWT
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET as string);

        // Validate admin credentials
        if (token_decode !== (process.env.ADMIN_EMAIL as string) + (process.env.ADMIN_PASSWORD as string)) {
            res.status(401).json({ success: false, message: "Not Auth, login again error" });
            return;
        }

        next();

    } catch (e: any) {
        console.log(e);
        res.status(500).json({ success: false, message: e.message });
    }
};

export default authAdmin;
