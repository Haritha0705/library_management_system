import { Router } from 'express';
import { getBooks, addBook } from '../controllers/bookController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBooks);
router.post('/', authenticate, addBook);

export default router;