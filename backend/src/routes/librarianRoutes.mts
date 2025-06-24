import {Router} from "express";
import {librarianLogin} from "../controllers/librarianControllers.mjs";


const librarianRouter = Router();

librarianRouter.post("/login",librarianLogin)

export default librarianRouter;