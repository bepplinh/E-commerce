const generateIdempotentKey = (orderId, paymentAttemptId) => {
    return `order_${orderId}_payment_${paymentAttemptId}`;
};
export default generateIdempotentKey;
