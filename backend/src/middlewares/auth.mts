import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// 1. Extend Express Request interface to include user
declare module "express" {
    export interface Request {
        user?: {
            id: string;
            role: string;
        };
    }
}

export const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

        if (!token) {
            res.status(401).json({ success: false, message: "No token found" });
            return;
        }

        // 2. Decode JWT and assert payload shape
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            role: string;
        };

        // 3. Attach user to request object
        req.user = decoded;

        next();
    } catch (e: any) {
        console.error(e);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
