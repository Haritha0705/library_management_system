import { Router } from 'express';
import {register} from "../controllers/authController.mjs";
import {login} from "../controllers/authController.mjs";

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;