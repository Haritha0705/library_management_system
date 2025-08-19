import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import {
    addBook,
    deleteBook,
    getAllBooks,
    updateBook,
    bookSearchByTitle,
    getBook,
    bookBorrow,
    bookReturn,
    bookAlreadyBorrow
} from "../controllers/bookControllers.mjs";
import upload from "../middlewares/multer.mjs";

const bookRoutes = Router();

//Book Routes

bookRoutes.get("/get-book/:bookId",authMiddleware,roleMiddleware("librarian","member"),getBook)
bookRoutes.get("/get-allBooks",authMiddleware,roleMiddleware("librarian","member"),getAllBooks)

bookRoutes.get("/search-book",authMiddleware,roleMiddleware("member"),bookSearchByTitle)
bookRoutes.post("/borrow/:bookId/:memberId",authMiddleware,roleMiddleware("member"),bookBorrow)
bookRoutes.post("/return/:bookId/:memberId",authMiddleware,roleMiddleware("member"),bookReturn)

bookRoutes.post("/add-book",authMiddleware,roleMiddleware("librarian"),upload.single('image'),addBook)
bookRoutes.patch("/update-book/:id",authMiddleware,roleMiddleware("librarian"),updateBook)
bookRoutes.delete("/delete-book/:id",authMiddleware,roleMiddleware("librarian"),deleteBook)

bookRoutes.post("/checkBookBorrow",authMiddleware,roleMiddleware("member"),bookAlreadyBorrow)

export default bookRoutes
