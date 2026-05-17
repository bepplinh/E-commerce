/**
 * Validate và sanitize req.body với Zod schema.
 * ZodError sẽ được chuyển sang errorMiddleware → 400 Bad Request.
 */
const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        next(err);
    }
};

/**
 * Validate và sanitize req.query với Zod schema.
 * Sau khi qua middleware này, req.query đã được ép kiểu và gán default.
 * ZodError sẽ được chuyển sang errorMiddleware → 400 Bad Request.
 *
 * @example
 * router.get("/products", validateQuery(productListQuerySchema), controller.getProduct);
 */
export const validateQuery = (schema) => (req, res, next) => {
    try {
        req.query = schema.parse(req.query);
        next();
    } catch (err) {
        next(err);
    }
};

export default validate;

