// import { Request, Response, NextFunction, RequestHandler } from "express";
//
// interface CustomRequest extends Request {
//     user?: {
//         id: string;
//         role: string;
//     };
// }
//
// export const roleMiddleware = (...allowedRoles: string[]): RequestHandler => {
//     return (req: CustomRequest, res: Response, next: NextFunction): void => {
//         const userRole = req.user?.role;
//
//         if (!userRole || !allowedRoles.includes(userRole)) {
//             res.status(403).json({
//                 success: false,
//                 message: "Access denied: insufficient role",
//             });
//             return;
//         }
//
//         next();
//     };
// };

import { Request, Response, NextFunction, RequestHandler } from "express";

interface CustomRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

export const roleMiddleware =
    (...allowedRoles: string[]): RequestHandler =>
        (req: Request, res: Response, next: NextFunction): void => {
            const customReq = req as CustomRequest;
            const userRole = customReq.user?.role?.toLowerCase();

            if (!userRole) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized: user role not found",
                });
                return;
            }

            const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

            if (!normalizedAllowedRoles.includes(userRole)) {
                res.status(403).json({
                    success: false,
                    message: `Access denied: insufficient role (Your role: ${userRole})`,
                });
                return;
            }
            next();
        };
