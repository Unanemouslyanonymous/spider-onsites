import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js"
import recommendationRoutes from "./routes/recommendationRoutes.js"
import passport from "./services/googleAuth.js";
dotenv.config();

connectDB();
const app = express();


app.use(cors({ 
    origin:"http://localhost:3000",
     credentials: true } ));
app.use(express.json());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/google', googleAuthRoutes);
app.use('/api/explore',recommendationRoutes)
const PORT = process.env.PORT ||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));