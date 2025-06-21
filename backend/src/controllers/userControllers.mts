import {Request, Response} from "express";
import userService, {UserService} from "../service/userService.mjs";

class UserControllers{

    private userService :UserService;

    constructor(userService:UserService) {
        this.userService = userService
    }


    getUser=(_:Request,res:Response):void=>{
        const users : string[]|null = this.userService.getUsers(1,10);
        if (users === null){
            res.status(400).send('error')
        }
        res.status(200).json({
            data:users,
        })
    }
}

export default new UserControllers(userService);