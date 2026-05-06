const ApiResponse = (
    res,
    { statusCode = 200, success = true, message = "Success", data = null, errors = null, meta = null, stack = null },
) => {
    const response = {
        success,
        message,
    };
    if (data !== null) response.data = data;
    if (errors !== null) response.errors = errors;
    if (meta !== null) response.meta = meta;

    // Chỉ đính kèm stack trace nếu là lỗi và đang ở môi trường development
    if (!success && stack && process.env.NODE_ENV === "development") {
        response.stack = stack;
    }
    return res.status(statusCode).json(response);
};
export default ApiResponse;
