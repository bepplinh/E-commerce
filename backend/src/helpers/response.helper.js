const ApiResponse = (res, message, data = null, meta = null, statusCode = 200) => {
    const response = {
        success: true,
        message,
    };
    if (data) response.data = data;
    if (meta) response.meta = meta;
    return res.status(statusCode).json(response);
};

export default ApiResponse;
