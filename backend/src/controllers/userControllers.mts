import { Request, Response } from "express";
import userService,{UserService} from "../service/userService.mjs";
import {LoginRes} from "../types/auth.type";

class UserControllers {
    private readonly userService:UserService

    constructor(userService:UserService) {
        this.userService=userService
    }

    getProfile = async (req: Request, res: Response): Promise<LoginRes> =>{
        try {
            const res:LoginRes = await this.userService.getProfile(req)

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

    updateProfile = async (req: Request, res: Response): Promise<LoginRes> =>{
        try {
            const res:LoginRes = await this.userService.updateProfile(req)

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

    deleteProfile = async (req: Request, res: Response): Promise<LoginRes> =>{
        try {
            const res:LoginRes = await this.userService.deleteProfile(req)

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

export default new UserControllers(userService)