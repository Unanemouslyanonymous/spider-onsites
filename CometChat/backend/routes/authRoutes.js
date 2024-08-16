import express from 'express';
import { register, login, getUser } from '../controllers/authControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUser);

export default router;
