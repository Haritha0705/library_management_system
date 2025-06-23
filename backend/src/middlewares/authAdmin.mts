import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend Request to add memberId
interface AuthenticatedRequest extends Request {
    memberId?: string;
}

const authAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { atoken } = req.headers;

        // if check no token
        if (!atoken || typeof atoken !== "string") {
            res.status(400).json({ success: false, message: "No token found" });
            return;
        }

        // decode jwt
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET as string) as any;

        if ((token_decode.email + token_decode.password) !== ((process.env.ADMIN_EMAIL as string) + (process.env.ADMIN_PASSWORD as string))) {
            res.json({ success: false, message: "Not Auth loging again error" });
            return;
        }

        req.memberId = token_decode.id;

        next();
    } catch (e: any) {
        console.log(e);
        res.status(500).json({ success: false, message: e.message });
    }
};

export default authAdmin;

