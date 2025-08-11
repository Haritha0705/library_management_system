import {Router} from "express";
import {
    bookBorrow,
    bookReturn,
    bookSearch,
    getProfile,
    updateProfile
} from "../controllers/memberControllers.mjs";

import upload from "../middlewares/multer.mjs";

const memberRouter = Router();

//Member Routes
memberRouter.put("/update-profile/:id",authMember,upload.single('image'),updateProfile)





export default memberRouter;
