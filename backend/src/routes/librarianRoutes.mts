import {Router} from "express";
import {addBook, getAllBooks, librarianLogin} from "../controllers/librarianControllers.mjs";
import authLibrarian from "../middlewares/authLibrarian.mjs";


const librarianRouter = Router();

librarianRouter.post("/login",librarianLogin)
librarianRouter.post("/add-book",authLibrarian,addBook)
librarianRouter.get("/get-allBooks",authLibrarian,getAllBooks)

export default librarianRouter;