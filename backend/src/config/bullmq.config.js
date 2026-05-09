import "dotenv/config";
import { redisConfig } from "./redis.js";

export const connection = redisConfig;

export const defaultJobOptions = {
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
};
