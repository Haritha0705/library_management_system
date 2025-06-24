import {Router} from "express";
import {addBook, librarianLogin} from "../controllers/librarianControllers.mjs";
import authLibrarian from "../middlewares/authLibrarian.mjs";


const librarianRouter = Router();

librarianRouter.post("/login",librarianLogin)
librarianRouter.post("/add-book",authLibrarian,addBook)

export default librarianRouter;