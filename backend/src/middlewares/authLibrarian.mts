import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extend Request to add Librarian
interface AuthenticatedRequest extends Request {
    librarianId?: string;
}

const authLibrarian = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const ltoken = req.headers.token as string | undefined;

        //if check no token
        if (!ltoken) {
            res.status(400).json({ success: false, message: "No l_token found" });
            return;
        }

        //decode jwt
        const token_decode = jwt.verify(ltoken, process.env.JWT_SECRET as string) as {
            id: string;
        };

        req.librarianId = token_decode.id;

        next();
    } catch (e: any) {
        console.log(e);
        res.status(500).json({ success: false, message: e.message });
    }
};

export default authLibrarian;
