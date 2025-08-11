import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import upload from "../middlewares/multer.mjs";
import {getProfile} from "../controllers/userControllers.mjs";

const userRoutes = Router();

//User Routes

userRoutes.get("/get-profile/:role/:userId",authMiddleware,roleMiddleware("librarian","member"),getProfile)
userRoutes.patch("/update-profile/:role/:userId",authMiddleware,roleMiddleware("librarian","member"),upload.single('image'))
userRoutes.delete("/get-profile/:role/:userId",authMiddleware,roleMiddleware("librarian","member"))

export default userRoutes