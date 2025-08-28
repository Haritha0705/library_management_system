import { Response } from "express";
import userService, { UserService } from "../service/userService.mjs"; // works if tsconfig has "allowJs": true
import {ProfileReq, ProfileRes} from "../types/profile";

class UserControllers {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getProfile = async (req: ProfileReq, res: Response): Promise<void> => {
        try {
            const result: ProfileRes  = await this.userService.getProfile(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({
                    success: false,
                    message:result.message
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });
        } catch (e: any) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: e.message,
            });
        }
    };

    updateProfile = async (req: ProfileReq, res: Response): Promise<void> => {
        try {
            const result: ProfileRes  = await this.userService.updateProfile(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({
                    success: false,
                    message:result.message
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });
        } catch (e: any) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: e.message,
            });
        }
    };

    deleteProfile = async (req: ProfileReq, res: Response): Promise<void> => {
        try {
            const result:ProfileRes = await this.userService.deleteProfile(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({
                    success: false,
                    message:result.message
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.message,
            });
        } catch (e: any) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: "Server error",
                error: e.message,
            });
        }
    };
}

export default new UserControllers(userService)
