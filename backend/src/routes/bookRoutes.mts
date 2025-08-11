import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import {getBook} from "../controllers/bookControllers.mjs";

const bookRoutes = Router();

//book routes
bookRoutes.get("/get-book/:id",authMiddleware,roleMiddleware("instructor","member"),getBook)

export default bookRoutes