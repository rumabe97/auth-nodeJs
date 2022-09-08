import {RateLimiterRedis} from "rate-limiter-flexible";
import {redisClient} from "./config";
import {maxWrongAttemptsByIPperDay} from "./values";

export const limiterSlowBruteByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'login_fail_ip_per_day',
    points: maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
});