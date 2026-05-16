import prisma from "../../config/prisma.js";

class VoucherRepository {
    async findByCode(code) {
        return await prisma.voucher.findUnique({
            where: { code },
        });
    }

    async getUserVoucher(userId, voucherId) {
        return await prisma.userVoucher.findUnique({
            where: {
                userId_voucherId: {
                    userId,
                    voucherId,
                },
            },
        });
    }

    async claimVoucher(userId, voucherId) {
        return await prisma.userVoucher.create({
            data: {
                userId,
                voucherId,
            },
        });
    }

    async getMyVouchers(userId) {
        return await prisma.userVoucher.findMany({
            where: { userId },
            include: {
                voucher: true,
            },
        });
    }
}

export default new VoucherRepository();
