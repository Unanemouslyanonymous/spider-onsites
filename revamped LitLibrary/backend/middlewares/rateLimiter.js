import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../utils/redisClient.js';

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
  }),
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limitung the api calls for every 15mins
  message: 'Too many requests, please try again later.',
});

export default limiter;
