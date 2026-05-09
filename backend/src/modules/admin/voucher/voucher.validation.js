import { z } from "zod";

const voucherCodeSchema = z
    .string()
    .trim()
    .min(1, "Mã voucher không được rỗng")
    .max(50, "Mã voucher quá dài");

const discountTypeSchema = z.enum(["PERCENTAGE", "FIXED"]);

export const createVoucherSchema = z.object({
    code: voucherCodeSchema,
    description: z.string().optional().nullable(),
    discountType: discountTypeSchema,
    discountValue: z.coerce.number().positive("discountValue phải lớn hơn 0"),
    minOrderAmount: z.coerce.number().min(0, "minOrderAmount không hợp lệ").optional(),
    maxDiscountAmount: z.coerce.number().positive("maxDiscountAmount phải lớn hơn 0").optional().nullable(),
    usageLimit: z.coerce.number().int().positive("usageLimit phải lớn hơn 0").optional().nullable(),
    startsAt: z.coerce.date(),
    expiresAt: z.coerce.date(),
    isActive: z.boolean().optional(),
});

export const updateVoucherSchema = z.object({
    code: voucherCodeSchema.optional(),
    description: z.string().optional().nullable(),
    discountType: discountTypeSchema.optional(),
    discountValue: z.coerce.number().positive("discountValue phải lớn hơn 0").optional(),
    minOrderAmount: z.coerce.number().min(0, "minOrderAmount không hợp lệ").optional(),
    maxDiscountAmount: z.coerce.number().positive("maxDiscountAmount phải lớn hơn 0").optional().nullable(),
    usageLimit: z.coerce.number().int().positive("usageLimit phải lớn hơn 0").optional().nullable(),
    startsAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
});
