import express from 'express';
import http from 'http';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRouter.js';
import groupRoutes from './routes/groupRouter.js';
import conversationRoutes from './routes/conversationRoutes.js';
import socketSetup from './socket/socket.js';
import dotenv from 'dotenv';
import cors from 'cors'
import { authMiddleware } from './middlewares/authMiddleware.js';
dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000'}));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/conversations',authMiddleware,conversationRoutes);

const server = http.createServer(app);
socketSetup(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
