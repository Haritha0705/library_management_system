import { Request, Response } from "express";
import authService,{AuthService} from "../service/authService.mjs";
import {LoginBody, LoginRes, RegisterBody, RegisterRes} from "../types/auth";

class AuthControllers {
    private readonly authService:AuthService

    constructor(authService:AuthService) {
        this.authService=authService
    }

    login = async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
        try {
            const result:LoginRes = await this.authService.login(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
                data: result.data,
                token: result.token,
            });
        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    register = async (req: Request<{}, {}, RegisterBody>, res: Response):Promise<void> =>{
        try {
            const result:RegisterRes = await this.authService.register(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({success: true, message: result.message, data: result.user, token: result.token});

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

}

export default new AuthControllers(authService)
