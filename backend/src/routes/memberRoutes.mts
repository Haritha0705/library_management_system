import express from "express";
import {registerMember} from "../controllers/memberControllers.mjs";


const memberRouter = express.Router();

memberRouter.get("/",registerMember)

export default memberRouter;