import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`http://localhost:3000/google/callback?token=${token}`);
  }
);

export default router;
