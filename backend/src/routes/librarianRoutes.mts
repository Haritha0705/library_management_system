import {Router} from "express";
import librarianControllers from "../controllers/librarianControllers.mjs";

const librarianRouter = Router();

librarianRouter.get("/",librarianControllers.getUser)

export default librarianRouter;