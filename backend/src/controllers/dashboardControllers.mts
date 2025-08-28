import {Request,Response} from "express";
import dashboardService,{DashboardService} from "../service/dashboardService.mjs";

export class DashboardControllers {
    private readonly dashboardService:DashboardService

    constructor(dashboardService:AuthService) {
        this.dashboardService=dashboardService
    }

    addLibrarian = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.dashboardService.addLibrarian(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
            });

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    getAllMembers = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.dashboardService.getAllMembers(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    getAllLibrarian = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.dashboardService.getAllLibrarian(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    deleteLibrarian = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.dashboardService.deleteLibrarian(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                message: result.message,
            });

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    librarianDashBoard = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.dashboardService.librarianDashBoard(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }

    borrowBooksList = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.dashboardService.borrowBooksList(req);

            if (!result.success) {
                res.status(result.status ?? 500).json({ success: false, message: result.message });
                return;
            }

            res.status(200).json({
                success: true,
                data: result.data,
            });

        }catch (e: any) {
            console.log(e);
            res.status(500).json({ success: false, message: "Server error", error: e.message });
        }
    }
}

export default new DashboardControllers(dashboardService)
