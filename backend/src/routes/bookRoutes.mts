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
    bookReturn
} from "../controllers/bookControllers.mjs";

const bookRoutes = Router();

//Book Routes

bookRoutes.get("/get-book/:id",authMiddleware,roleMiddleware("librarian","member"),getBook)
bookRoutes.get("/get-allBooks",authMiddleware,roleMiddleware("librarian","member"),getAllBooks)

bookRoutes.get("/search-book",authMiddleware,roleMiddleware("member"),bookSearchByTitle)
bookRoutes.post("/:bookId/borrow/:memberId",authMiddleware,roleMiddleware("member"),bookBorrow)
bookRoutes.post("/:bookId/return/:memberId",authMiddleware,roleMiddleware("member"),bookReturn)

bookRoutes.post("/add-book",authMiddleware,roleMiddleware("librarian"),addBook)
bookRoutes.patch("/update-book/:id",authMiddleware,roleMiddleware("librarian"),updateBook)
bookRoutes.delete("/delete-book/:id",authMiddleware,roleMiddleware("librarian"),deleteBook)

export default bookRoutes
