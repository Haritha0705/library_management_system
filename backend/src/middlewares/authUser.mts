import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    memberId?: string;
}

const authUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "No or malformed token" });
            return;
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
        };

        req.memberId = decoded.id;

        next();
    } catch (e: any) {
        console.error("Token error:", e);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
