import Redis from 'ioredis'

export const redisClient = new Redis({
    enableOfflineQueue: false,
    host: "redis",
    port:6379
});
