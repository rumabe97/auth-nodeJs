import {RateLimiterRedis} from "rate-limiter-flexible";
import {redisClient} from "./config";
import {maxConsecutiveFailsByEmail} from "./values";

export const limiterConsecutiveFailsByEmail = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_consecutive_username',
    points: maxConsecutiveFailsByEmail,
    duration: 60 * 60 * 3, // Store number for three hours since first fail
    blockDuration: 60 * 15, // Block for 15 minutes
});