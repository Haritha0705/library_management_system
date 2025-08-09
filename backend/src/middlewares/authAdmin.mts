import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomJwtPayload extends JwtPayload {
    email?: string;
}

const authAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "No token found" });
            return;
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload | string;

        let email: string | undefined;
        if (typeof decoded === "string") {
            email = decoded;
        } else if (decoded && typeof decoded === "object") {
            email = decoded.email;
        }

        if (!email || email !== process.env.ADMIN_EMAIL) {
            res.status(401).json({ success: false, message: "Not authorized, please login again" });
            return;
        }

        next();
    } catch (error: any) {
        console.error(error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authAdmin;
