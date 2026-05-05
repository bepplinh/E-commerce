import prisma from "../../config/prisma.js";

const OrderRepository = {
    getOrderByUserId: (filters, skip, take) => {
        return prisma.order.findMany({
            where: { userId: userId, ...filters },
            include: {
                items: true,
            },
            skip: skip,
            take: take,
            orderBy: { createdAt: "desc" },
        });
    },

    countOrders: (filters) => {
        return prisma.order.count({ where: filters });
    },
};

export default OrderRepository;
