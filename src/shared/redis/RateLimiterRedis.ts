import {RateLimiterRedis} from "rate-limiter-flexible";
import {redisClient} from "./config";
import {ErrResponseService} from "../errors/ErrorService";
import {CODE_TOO_MANY_REQUESTS} from "../enums/Errors";
import {maxRequestPerSecond} from "./values";

const rateLimiterRedis = new RateLimiterRedis({
    storeClient: redisClient,
    points: maxRequestPerSecond, // Number of points
    duration: 60, // Per second
    inmemoryBlockOnConsumed: maxRequestPerSecond, // If userId or IP consume >=300 points per minute
});

export const rateLimiterMiddleware = (req, res, next) => {
    const key = req.headers.authorization ? req.headers.authorization : req.ip;
    const pointsToConsume = req.headers.authorization ? 1 : 30;

    rateLimiterRedis.consume(key, pointsToConsume)
        .then(() => {
            next();
        })
        .catch(_ => {
            const resp = ErrResponseService({
                status: 'Too Many Requests',
                statusCode: CODE_TOO_MANY_REQUESTS,
                message: 'Ip is blocked'
            });
            return res.status(CODE_TOO_MANY_REQUESTS).send(resp);
        });
};