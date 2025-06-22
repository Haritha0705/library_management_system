import {Router} from "express";
import registerMember from "../controllers/memberControllers.mjs";

const router = Router();

router.post("/register", registerMember);

export default router;
