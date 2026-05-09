import prisma from "../../../config/prisma.js";

class VoucherRepository {
    getAll() {
        return prisma.voucher.findMany({
            include: {
                _count: {
                    select: {
                        orders: true,
                        userVouchers: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }

    getById(id) {
        return prisma.voucher.findUnique({
            where: { id: parseInt(id) },
            include: {
                orders: {
                    select: {
                        id: true,
                        code: true,
                        status: true,
                        totalAmount: true,
                        createdAt: true,
                    },
                },
                userVouchers: {
                    select: {
                        id: true,
                        userId: true,
                        usedAt: true,
                    },
                },
                _count: {
                    select: {
                        orders: true,
                        userVouchers: true,
                    },
                },
            },
        });
    }

    findByCode(code) {
        return prisma.voucher.findUnique({
            where: { code },
        });
    }

    create(data) {
        return prisma.voucher.create({
            data,
        });
    }

    update(id, data) {
        return prisma.voucher.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    delete(id) {
        return prisma.voucher.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new VoucherRepository();
