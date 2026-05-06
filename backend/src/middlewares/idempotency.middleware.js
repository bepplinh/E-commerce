import redisClient from "../config/redis.js";

const IDEMPOTENCY_EXPIRATION_SECONDS = 24 * 60 * 60; // 24 hours

/**
 * Middleware to handle Idempotency for POST/PUT/PATCH/DELETE requests.
 * It intercepts the request, checks for an 'x-idempotency-key' header.
 * If the key exists in Redis, it returns the cached response.
 * Otherwise, it processes the request and caches the response.
 */
export const idempotencyMiddleware = async (req, res, next) => {
    // 1. Extract the Idempotency Key from headers
    const idempotencyKey = req.headers["x-idempotency-key"];
    
    // If no key provided, bypass the middleware
    if (!idempotencyKey) {
        return next();
    }

    const cacheKey = `idempotency:${req.method}:${req.baseUrl || req.path}:${idempotencyKey}`;

    try {
        // 2. Check if response is already cached
        const cachedResponse = await redisClient.get(cacheKey);
        
        if (cachedResponse) {
            console.log(`[Idempotency] Cache hit for key: ${idempotencyKey}`);
            const { status, body } = JSON.parse(cachedResponse);
            return res.status(status).json(body);
        }

        // 3. Intercept the response to save it after processing
        const originalJson = res.json;
        res.json = function (body) {
            // Only cache successful or client-error responses (avoid caching 5xx internal errors)
            if (res.statusCode < 500) {
                const responseToCache = {
                    status: res.statusCode,
                    body: body
                };
                
                // Save to Redis (fire and forget)
                redisClient.set(cacheKey, JSON.stringify(responseToCache), "EX", IDEMPOTENCY_EXPIRATION_SECONDS)
                    .catch(err => console.error("Redis Idempotency Set Error:", err));
            }

            // Call the original res.json method to send the response
            return originalJson.call(this, body);
        };

        next();
    } catch (error) {
        // Fallback to normal flow if Redis is down
        console.error("Idempotency Middleware Error:", error);
        next();
    }
};
