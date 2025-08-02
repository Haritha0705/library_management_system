import { Request, Response, NextFunction, RequestHandler } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

// Role-based middleware
export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
    return (req:Request, res:Response, next:NextFunction) => {
        try {
            const userRole = req.user?.role;

            if (!userRole || !allowedRoles.includes(userRole)) {
                res.status(403).json({ message: "Access denied: insufficient role" });
                return;
            }

            next();

        } catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: e.message });
        }
    };
};
