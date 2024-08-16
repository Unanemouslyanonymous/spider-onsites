import session from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from './redisClient.js';

const RedisStore = connectRedis(session);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 3600000 },
});

export default sessionMiddleware;
