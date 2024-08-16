import { login, register, loadUser, forgotPassword, resetPassword, updateProfile } from "../controllers/authController.js";
import express from "express";
import auth from "../middlewares/auth.js";
import { validateRecaptcha } from "../middlewares/validateReCAPTCHA.js";
const router = express.Router();

router.post("/login",validateRecaptcha, login);
router.post("/register",validateRecaptcha, register);
router.put("/update-profile",auth,updateProfile)
router.get("/",auth, loadUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;