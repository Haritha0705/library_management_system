import {Router} from "express";
import {addLibrarian, getAllMemers, loginAdmin} from "../controllers/adminControllers.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";

const adminRouter = Router();

adminRouter.post("/login",loginAdmin)

adminRouter.post("/add-librarian",authAdmin,addLibrarian)
adminRouter.get("/get-members",authAdmin,getAllMemers)

export default adminRouter;