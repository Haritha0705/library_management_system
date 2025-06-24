import {Router} from "express";
import {
    addLibrarian,
    deleteLibrarian,
    getAllLibrarian,
    getAllMemers,
    loginAdmin
} from "../controllers/adminControllers.mjs";
import authAdmin from "../middlewares/authAdmin.mjs";

const adminRouter = Router();

adminRouter.post("/login",loginAdmin)

adminRouter.post("/add-librarian",authAdmin,addLibrarian)
adminRouter.get("/get-members",authAdmin,getAllMemers)
adminRouter.get("/get-librarian",authAdmin,getAllLibrarian)
adminRouter.delete("/delete-librarian/:id",authAdmin,deleteLibrarian)

export default adminRouter;