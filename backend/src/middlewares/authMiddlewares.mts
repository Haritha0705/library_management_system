import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        // Check if no header or wrong format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({ success: false, message: "No token provided" });
            return;
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // Decode JWT
        const token_decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            role: string;
        };

        req.user = token_decode;

        next();
    } catch (e: any) {
        console.error(e);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
