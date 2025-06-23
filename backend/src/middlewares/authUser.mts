import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend Request to add userId
interface AuthenticatedRequest extends Request {
    memberId?: string;
}

const authUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string | undefined;

        //if check no token
        if (!token) {
            res.status(400).json({ success: false, message: "No token found" });
            return;
        }

        //decode jwt
        const token_decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
        };

        req.memberId = token_decode.id;

        next();
    } catch (e: any) {
        console.log(e);
        res.status(500).json({ success: false, message: e.message });
    }
};

export default authUser;
