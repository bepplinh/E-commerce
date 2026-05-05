import OrderRepository from "./order.repository.js";

const OrderService = {
    getOrderByUserId: async (userId, queryParams) => {
        const { status, fromDate, toDate, paymentStatus, page = 1, limit = 10 } = queryParams;
        const filters = {
            userId: userId,
        };
        if (fromDate || toDate) {
            filters.createdAt = {};
            if (fromDate) {
                filters.createdAt.gte = new Date(fromDate);
            }
            if (toDate) {
                filters.createdAt.lte = new Date(toDate);
            }
        }

        if (status) filters.status = status;
        if (paymentStatus) {
            filters.paymentStatus = paymentStatus;
        }

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const take = parsedLimit;
        const skip = (parsedPage - 1) * parsedLimit;

        const [orders, totalRecords] = await Promise.all([OrderRepository.getOrderByUserId(filters, skip, take), OrderRepository.count(filters)]);

        return {
            data: orders,
            meta: {
                total: totalRecords,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(totalRecords / parsedLimit),
            },
        };
    },
};

export default OrderService;
