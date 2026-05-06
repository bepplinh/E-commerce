import Redis from "ioredis";
import "dotenv/config";

const redisConfig = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || undefined,
};

const redisClient = new Redis(redisConfig);

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully!");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redisClient;
