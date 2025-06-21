import { Router } from 'express';
import { getUsers } from '../controllers/userController.mjs';
import authenticate  from '../middleware/authMiddleware.mjs';

const router = Router();

router.get('/', authenticate, getUsers);

export default router;