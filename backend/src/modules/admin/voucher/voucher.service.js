import { BadRequestError, ConflictError, NotFoundError } from "../../../utils/app-error.js";
import voucherRepository from "./voucher.repository.js";

const validateVoucherId = (id) => {
    const voucherId = Number(id);
    if (!Number.isInteger(voucherId) || voucherId <= 0) {
        throw new BadRequestError("ID voucher không hợp lệ");
    }
    return voucherId;
};

const normalizeCode = (code) => code.trim().replace(/\s+/g, "").toUpperCase();

const validateVoucherBusinessRules = (voucher) => {
    const startsAt = voucher.startsAt instanceof Date ? voucher.startsAt : new Date(voucher.startsAt);
    const expiresAt = voucher.expiresAt instanceof Date ? voucher.expiresAt : new Date(voucher.expiresAt);

    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(expiresAt.getTime())) {
        throw new BadRequestError("Thời gian voucher không hợp lệ");
    }

    if (startsAt >= expiresAt) {
        throw new BadRequestError("startsAt phải nhỏ hơn expiresAt");
    }

    if (voucher.discountType === "PERCENTAGE" && Number(voucher.discountValue) > 100) {
        throw new BadRequestError("discountValue của voucher phần trăm không được lớn hơn 100");
    }

    if (voucher.discountType === "FIXED" && Number(voucher.discountValue) <= 0) {
        throw new BadRequestError("discountValue phải lớn hơn 0");
    }

    if (voucher.minOrderAmount !== undefined && Number(voucher.minOrderAmount) < 0) {
        throw new BadRequestError("minOrderAmount không hợp lệ");
    }

    if (voucher.maxDiscountAmount !== null && voucher.maxDiscountAmount !== undefined && Number(voucher.maxDiscountAmount) <= 0) {
        throw new BadRequestError("maxDiscountAmount không hợp lệ");
    }

    if (voucher.usageLimit !== null && voucher.usageLimit !== undefined && Number(voucher.usageLimit) <= 0) {
        throw new BadRequestError("usageLimit không hợp lệ");
    }
};

const getAllVouchers = async () => {
    return voucherRepository.getAll();
};

const getVoucherById = async (id) => {
    const voucherId = validateVoucherId(id);
    const voucher = await voucherRepository.getById(voucherId);

    if (!voucher) {
        throw new NotFoundError("Không tìm thấy voucher");
    }

    return voucher;
};

const createVoucher = async (data) => {
    const code = normalizeCode(data.code);
    const existing = await voucherRepository.findByCode(code);

    if (existing) {
        throw new ConflictError("Mã voucher đã tồn tại");
    }

    const voucherPayload = {
        code,
        description: data.description ?? null,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderAmount: data.minOrderAmount ?? 0,
        maxDiscountAmount: data.maxDiscountAmount ?? null,
        usageLimit: data.usageLimit ?? null,
        startsAt: data.startsAt,
        expiresAt: data.expiresAt,
        isActive: data.isActive ?? true,
        usedCount: 0,
    };

    validateVoucherBusinessRules(voucherPayload);

    return voucherRepository.create(voucherPayload);
};

const updateVoucher = async (id, data) => {
    const voucherId = validateVoucherId(id);
    const voucher = await voucherRepository.getById(voucherId);

    if (!voucher) {
        throw new NotFoundError("Không tìm thấy voucher");
    }

    const nextCode = data.code ? normalizeCode(data.code) : voucher.code;

    if (nextCode !== voucher.code) {
        const existing = await voucherRepository.findByCode(nextCode);
        if (existing && existing.id !== voucherId) {
            throw new ConflictError("Mã voucher đã tồn tại");
        }
    }

    const voucherPayload = {
        code: nextCode,
        description: data.description === undefined ? voucher.description : data.description,
        discountType: data.discountType ?? voucher.discountType,
        discountValue: data.discountValue ?? Number(voucher.discountValue),
        minOrderAmount: data.minOrderAmount ?? Number(voucher.minOrderAmount),
        maxDiscountAmount: data.maxDiscountAmount === undefined ? voucher.maxDiscountAmount : data.maxDiscountAmount,
        usageLimit: data.usageLimit === undefined ? voucher.usageLimit : data.usageLimit,
        startsAt: data.startsAt ?? voucher.startsAt,
        expiresAt: data.expiresAt ?? voucher.expiresAt,
        isActive: data.isActive === undefined ? voucher.isActive : data.isActive,
    };

    validateVoucherBusinessRules(voucherPayload);

    return voucherRepository.update(voucherId, voucherPayload);
};

const deleteVoucher = async (id) => {
    const voucherId = validateVoucherId(id);
    const voucher = await voucherRepository.getById(voucherId);

    if (!voucher) {
        throw new NotFoundError("Không tìm thấy voucher");
    }

    return voucherRepository.delete(voucherId);
};

export { getAllVouchers, getVoucherById, createVoucher, updateVoucher, deleteVoucher };
