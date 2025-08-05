// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
//
// // Extend Request to add memberId
// interface AuthenticatedRequest extends Request {
//     memberId?: string;
// }
//
// const authUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const token = req.headers.token as string | undefined;
//
//         //if check no token
//         if (!token) {
//             res.status(400).json({ success: false, message: "No token found" });
//             return;
//         }
//
//         //decode jwt
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET as string) as {
//             id: string;
//         };
//
//         req.memberId = token_decode.id;
//
//         next();
//     } catch (e: any) {
//         console.log(e);
//         res.status(500).json({ success: false, message: e.message });
//     }
// };
//
// export default authUser;
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    memberId?: string;
}

const authUser = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
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
