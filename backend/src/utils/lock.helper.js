import redisClient from "../config/redis.js";

/**
 * Thử đặt một lock trong Redis
 * @param {string} key - Tên lock
 * @param {number} ttlSeconds - Thời gian hết hạn lock (giây)
 * @returns {Promise<boolean>} - Trả về true nếu đặt được lock, false nếu đã có lock
 */
export const acquireLock = async (key, ttlSeconds = 10) => {
    // NX: Chỉ đặt nếu chưa tồn tại
    // EX: Thời gian hết hạn
    const result = await redisClient.set(key, "locked", "EX", ttlSeconds, "NX");
    return result === "OK";
};

/**
 * Giải phóng lock
 * @param {string} key 
 */
export const releaseLock = async (key) => {
    await redisClient.del(key);
};
