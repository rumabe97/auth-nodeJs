import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = new Redis({ enableOfflineQueue: false, host: "redis" });

const maxConsecutiveFailsByUsername = 5;

export const limiterConsecutiveFailsByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_consecutive_username',
    points: maxConsecutiveFailsByUsername,
    duration: 60 * 60 * 3, // Store number for three hours since first fail
    blockDuration: 60 * 15, // Block for 15 minutes
});