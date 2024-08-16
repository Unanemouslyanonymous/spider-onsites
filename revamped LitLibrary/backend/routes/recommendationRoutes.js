import express from 'express';
const router = express.Router();
import { getRecommendations } from '../controllers/recommendationController.js';
import authMiddleware from '../middlewares/auth.js';

router.get('/',authMiddleware, getRecommendations);

export default router