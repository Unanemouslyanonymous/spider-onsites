import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    const email = emails[0].value;

    try {
      let user =  await User.findOne({ googleId: id });
      if (!user) {
        user = await User.findOne({ email });
        if (user) {
          user.googleId = id;
        } else {
          user = new User({
            name: displayName,
            email,
            googleId: id,
          });
        }
        await user.save();
      }

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return done(null, { user, token });
    } catch (error) {
      console.error(error);
      return done(error, false);
    }
  }
)
);

export default passport;
