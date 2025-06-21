import {Router,Request,Response} from "express";

const rootRouter = Router();

rootRouter.get("/",(_:Request,res:Response)=>{
    res.send("Welcome to node + ts")
})

export default rootRouter;