import express from 'express';
import { createGroup, getGroupById, getGroups } from '../controllers/groupController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createGroup);
router.get('/', authMiddleware, getGroups);
router.get('/:groupId', authMiddleware, getGroupById);


export default router;
