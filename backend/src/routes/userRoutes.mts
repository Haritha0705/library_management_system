import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddlewares.mjs";
import {roleMiddleware} from "../middlewares/roleMiddlewares.mjs";
import upload from "../middlewares/multer.mjs";
import userControllers, {deleteProfile, getProfile, updateProfile} from "../controllers/userControllers.mjs";

const userRoutes = Router();

//User Routes

userRoutes.get("/get-profile/:role/:id",authMiddleware,roleMiddleware("librarian","member"),userControllers.getProfile)
userRoutes.put("/update-profile/:role/:id",authMiddleware,roleMiddleware("librarian","member"),upload.single('image'),updateProfile)
userRoutes.delete("/delete-profile/:role/:id",authMiddleware,roleMiddleware("librarian","member"),deleteProfile)

export default userRoutes;