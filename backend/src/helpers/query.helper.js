import { z } from "zod";

/**
 * Chuyển "", null, undefined → undefined (dùng trong z.preprocess)
 */
export const emptyToUndefined = (value) => {
    if (value === undefined || value === null) return undefined;
    if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? undefined : trimmed;
    }
    return value;
};

/**
 * Chuyển query string đơn/nhiều thành string[] sạch
 * "Red"          → ["Red"]
 * ["Red","Blue"] → ["Red","Blue"]
 * ""             → undefined
 */
export const toStringArray = (value) => {
    if (value === undefined || value === null) return undefined;
    const arr = Array.isArray(value) ? value : [value];
    const filtered = arr.map((v) => (typeof v === "string" ? v.trim() : v)).filter(Boolean);
    return filtered.length > 0 ? filtered : undefined;
};

// ─────────────────────────────────────────────
// Reusable Field Schemas
// ─────────────────────────────────────────────

export const optionalText = z.preprocess(emptyToUndefined, z.string().optional());

export const optionalNumber = z.preprocess(emptyToUndefined, z.coerce.number().optional());

export const optionalStringArray = z.preprocess(toStringArray, z.array(z.string()).optional());

// ─────────────────────────────────────────────
// Pagination Schema Factory
// ─────────────────────────────────────────────

/**
 * Tạo schema phân trang chuẩn cho mọi danh sách.
 * @param {object} options
 * @param {number} [options.defaultPage=1]
 * @param {number} [options.defaultLimit=10]
 * @param {number} [options.maxLimit=50]
 *
 * @example
 * // Dùng mặc định
 * const schema = z.object({ ...paginationSchema() });
 *
 * // Tuỳ chỉnh limit
 * const schema = z.object({ ...paginationSchema({ defaultLimit: 20, maxLimit: 100 }) });
 */
export const paginationSchema = ({ defaultPage = 1, defaultLimit = 10, maxLimit = 50 } = {}) => {
    const positiveInt = (fallback, max) =>
        z
            .preprocess(emptyToUndefined, z.coerce.number().int().positive())
            .default(fallback)
            .transform((v) => (max !== undefined && v > max ? max : v));

    return {
        page: positiveInt(defaultPage),
        limit: positiveInt(defaultLimit, maxLimit),
    };
};

// ─────────────────────────────────────────────
// Search Schema (dùng chung khi cần tìm kiếm text)
// ─────────────────────────────────────────────

export const searchSchema = {
    search: optionalText,
};
