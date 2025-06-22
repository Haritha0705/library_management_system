// import {Request, Response} from "express";
// import adminService,{AdminService} from "../service/adminService.mjs";
//
// class AdminControllers{
//
//     private adminService :AdminService;
//
//     constructor(adminService:AdminService) {
//         this.adminService = adminService
//     }
//
//     getUser=(_:Request,res:Response):void=>{
//         const users : string[]|null = this.adminService.getUsers(1,10);
//         if (users === null){
//             res.status(400).send('error')
//         }
//         res.status(200).json({
//             data:users,
//         })
//     }
// }
//
// export default new AdminControllers(adminService);