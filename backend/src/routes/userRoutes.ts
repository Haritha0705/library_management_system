import { Router } from 'express';
import { getUsers } from '../controllers/userController';
import authenticate  from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, getUsers);

export default router;