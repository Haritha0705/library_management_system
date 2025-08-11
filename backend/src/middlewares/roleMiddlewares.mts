import { Request, Response, NextFunction, RequestHandler } from "express";

interface CustomRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const roleMiddleware = (...allowedRoles: string[]): RequestHandler => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({
                success: false,
                message: "Access denied: insufficient role",
            });
            return;
        }

        next();
    };
};
