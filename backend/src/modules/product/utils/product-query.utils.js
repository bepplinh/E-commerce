/**
 * ──────────────────────────────────────────────────────────────────
 *  PRODUCT QUERY UTILS  (modules/product/utils/product-query.utils.js)
 *
 *  Định nghĩa:
 *    1. productQuerySchema  — Zod schema validate + default
 *    2. productPreprocessConfig — hướng dẫn type-cast cho query-parser
 *    3. parseProductQuery   — shorthand export tiện dùng
 *
 *  Mở rộng: Thêm query mới chỉ cần:
 *    A. Thêm field vào productQuerySchema
 *    B. (Nếu không phải string) thêm vào productPreprocessConfig
 * ──────────────────────────────────────────────────────────────────
 */

import { z } from "zod";
import { parseQuery } from "../../../utils/query-parser.js";

// ── Các hằng ──────────────────────────────────────────────────────

const SORT_FIELDS = ["createdAt", "price", "name", "soldCount", "rating"];
const SORT_ORDERS = ["asc", "desc"];
const MAX_LIMIT = 100;

// ── 1. Zod Schema ─────────────────────────────────────────────────
//
//  Mỗi field nên có:
//    - .default(...)   để luôn có giá trị sau parse
//    - .optional()     nếu field không bắt buộc
//    - comment mô tả  để dễ hiểu

export const productQuerySchema = z.object({
    // ── Phân trang ────────────────────────────────────────────────
    page: z
        .number({ invalid_type_error: "page phải là số nguyên" })
        .int()
        .positive("page phải > 0")
        .default(1),

    limit: z
        .number({ invalid_type_error: "limit phải là số nguyên" })
        .int()
        .positive()
        .max(MAX_LIMIT, `limit tối đa là ${MAX_LIMIT}`)
        .default(20),

    // ── Tìm kiếm ─────────────────────────────────────────────────
    /** Tìm theo tên sản phẩm (LIKE %keyword%) */
    keyword: z.string().trim().max(200).optional(),

    // ── Lọc cơ bản ───────────────────────────────────────────────
    /** Lọc theo category ID */
    categoryId: z
        .number({ invalid_type_error: "categoryId phải là số" })
        .int()
        .positive()
        .optional(),

    /** Lọc theo nhiều brand ID: ?brandIds=1,2,3 hoặc ?brandIds=1&brandIds=2 */
    brandIds: z
        .array(z.number().int().positive())
        .optional(),

    /** Chỉ hiện sản phẩm đang active */
    isActive: z
        .boolean()
        .default(true),

    // ── Lọc giá ──────────────────────────────────────────────────
    /** Giá tối thiểu (VND) */
    minPrice: z
        .number()
        .nonnegative("minPrice không được âm")
        .optional(),

    /** Giá tối đa (VND) */
    maxPrice: z
        .number()
        .positive("maxPrice phải > 0")
        .optional(),

    // ── Sắp xếp ──────────────────────────────────────────────────
    /** Field dùng để sort */
    sortBy: z
        .enum(SORT_FIELDS, {
            errorMap: () => ({
                message: `sortBy phải là một trong: ${SORT_FIELDS.join(", ")}`,
            }),
        })
        .default("createdAt"),

    /** Hướng sort */
    sortOrder: z
        .enum(SORT_ORDERS)
        .default("desc"),

    // ── Attribute filter (dynamic) ────────────────────────────────
    /**
     * Lọc theo attribute value IDs: ?attributeValueIds=10,11,12
     * Hữu ích khi filter màu sắc, kích cỡ, chất liệu, v.v.
     */
    attributeValueIds: z
        .array(z.number().int().positive())
        .optional(),

    // ── Thêm field mới ở đây khi cần ─────────────────────────────
    // Ví dụ: rating, inStock, tags, collectionId, ...
});

// ── 2. Preprocess Config ──────────────────────────────────────────
//
//  Khai báo field nào cần được ép kiểu TRƯỚC khi Zod validate.
//  Chỉ khai báo các field KHÔNG phải string.

export const productPreprocessConfig = {
    page:               { type: "int" },
    limit:              { type: "int" },
    categoryId:         { type: "int" },
    brandIds:           { type: "array", arrayItemType: "int" },
    minPrice:           { type: "float" },
    maxPrice:           { type: "float" },
    attributeValueIds:  { type: "array", arrayItemType: "int" },
    // isActive: string "true"/"false" — cần xử lý riêng bên dưới
};

// ── 3. parseProductQuery ──────────────────────────────────────────

/**
 * Hàm shorthand: parse + validate query của product endpoint.
 *
 * @param {object} rawQuery — req.query
 * @returns {ProductQuery}  — object đã validate + default
 * @throws  {BadRequestError}
 *
 * @example
 *   // Trong service:
 *   const query = parseProductQuery(req.query);
 *   // → { page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc', ... }
 */
export const parseProductQuery = (rawQuery) => {
    // isActive: "true"/"false" → boolean trước khi Zod kiểm tra
    const normalized = { ...rawQuery };
    if (normalized.isActive !== undefined) {
        normalized.isActive = normalized.isActive === "true"
            ? true
            : normalized.isActive === "false"
                ? false
                : normalized.isActive; // để Zod báo lỗi nếu giá trị lạ
    }

    return parseQuery(normalized, productQuerySchema, productPreprocessConfig);
};
