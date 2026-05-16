import VoucherRepository from "./voucher.repository.js";

class VoucherService {
    async validateVoucher(code, orderAmount, userId) {
        const voucher = await VoucherRepository.findByCode(code);

        if (!voucher) {
            throw new Error("Voucher not found");
        }

        if (!voucher.isActive) {
            throw new Error("Voucher is not active");
        }

        const now = new Date();
        if (now < new Date(voucher.startsAt)) {
            throw new Error("Voucher has not started yet");
        }
        if (now > new Date(voucher.expiresAt)) {
            throw new Error("Voucher has expired");
        }

        if (voucher.usageLimit !== null && voucher.usedCount >= voucher.usageLimit) {
            throw new Error("Voucher usage limit reached");
        }

        if (orderAmount < Number(voucher.minOrderAmount)) {
            throw new Error(`Minimum order amount of ${voucher.minOrderAmount} required`);
        }

        // Check if user has already used this voucher if it's a one-time use per user
        // (This might require an Order check, but let's check UserVoucher first if that's how we track usage)
        if (userId) {
            const userVoucher = await VoucherRepository.getUserVoucher(userId, voucher.id);
            if (userVoucher && userVoucher.usedAt) {
                throw new Error("You have already used this voucher");
            }
        }

        // Calculate discount
        let discount = 0;
        if (voucher.discountType === "PERCENTAGE") {
            discount = (orderAmount * Number(voucher.discountValue)) / 100;
            if (voucher.maxDiscountAmount && discount > Number(voucher.maxDiscountAmount)) {
                discount = Number(voucher.maxDiscountAmount);
            }
        } else {
            discount = Number(voucher.discountValue);
        }

        return {
            id: voucher.id,
            code: voucher.code,
            discountAmount: discount,
            discountType: voucher.discountType,
            discountValue: voucher.discountValue,
        };
    }

    async claimVoucher(userId, voucherId) {
        const existing = await VoucherRepository.getUserVoucher(userId, voucherId);
        if (existing) {
            throw new Error("You have already claimed this voucher");
        }
        return await VoucherRepository.claimVoucher(userId, voucherId);
    }

    async getMyVouchers(userId) {
        return await VoucherRepository.getMyVouchers(userId);
    }
}

export default new VoucherService();
