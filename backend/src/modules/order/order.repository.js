import prisma from "../../config/prisma.js";


const OrderRepository = {
    getOrderByUserId: async (filters, skip, take) => {
        return await prisma.order.findMany({
            where: filters,
            include: {
                items: true,
            },
            skip,
            take,
            orderBy: { createdAt: "desc" },
        });
    },

    getOrderByCode: (code) => {
        return prisma.order.findUnique({
            where: { code },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
        });
    },

    getOrderByIdempotencyKey: (idempotencyKey) => {
        if (!idempotencyKey) return null;
        return prisma.order.findUnique({
            where: { idempotencyKey },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
        });
    },

    countOrders: (filters) => {
        return prisma.order.count({ where: filters });
    },

    createOrder: async (data, tx = prisma) => {
        const { orderItems, payment, ...orderData } = data;
        const paymentData = payment ?? {
            paymentMethod: "BANK_TRANSFER",
            status: "PENDING",
            amount: orderData.totalAmount,
        };

        return await tx.order.create({
            data: {
                ...orderData,
                items: {
                    create: orderItems.map((item) => ({
                        variantId: item.variantId,
                        quantity: item.quantity,
                        price: item.price,
                        snapshotSku: item.snapshotSku,
                        snapshotName: item.snapshotName,
                        snapshotOptions: item.snapshotOptions,
                    })),
                },
                payments: {
                    create: paymentData,
                },
            },
            include: {
                items: true,
            },
        });
    },

    /**
     * Bọc một callback trong Prisma transaction.
     * Dùng khi caller cần thực thi nhiều thao tác DB atomically
     * mà không muốn import prisma trực tiếp.
     *
     * @template T
     * @param {(tx: import('@prisma/client').PrismaClient) => Promise<T>} callback
     * @returns {Promise<T>}
     */
    createOrderInTransaction: (callback) => {
        return prisma.$transaction(callback);
    },
};

export default OrderRepository;
