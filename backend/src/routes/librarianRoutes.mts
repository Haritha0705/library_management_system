import {Router} from "express";
import {addBook, deleteBook, getAllBooks, librarianLogin, updateBook} from "../controllers/librarianControllers.mjs";
import authLibrarian from "../middlewares/authLibrarian.mjs";


const librarianRouter = Router();

librarianRouter.post("/login",librarianLogin)
librarianRouter.post("/add-book",authLibrarian,addBook)
librarianRouter.get("/get-allBooks",authLibrarian,getAllBooks)
librarianRouter.put("/update-book/:id",authLibrarian,updateBook)
librarianRouter.delete("/delete-book/:id",authLibrarian,deleteBook)


export default librarianRouter;