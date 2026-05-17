/**
 * ──────────────────────────────────────────────────────────────────
 *  CORE QUERY PARSER  (src/utils/query-parser.js)
 *  Reusable cho mọi module: product, order, user, v.v.
 * ──────────────────────────────────────────────────────────────────
 *
 *  Luồng xử lý:
 *    raw req.query
 *      → preprocess  (ép kiểu, split array, parse number…)
 *      → zod.safeParse (validate + default)
 *      → parsed object sạch
 *
 *  Cách dùng ở module:
 *    import { parseQuery } from '../../utils/query-parser.js';
 *    import { productQuerySchema } from './utils/product-query.utils.js';
 *
 *    const parsed = parseQuery(req.query, productQuerySchema);
 */

import { BadRequestError } from "./app-error.js";

// ── 1. Helpers tiền xử lý ─────────────────────────────────────────

/**
 * Ép chuỗi "123" → số nguyên. Trả undefined nếu không hợp lệ.
 */
const toInt = (val) => {
    const n = parseInt(val, 10);
    return Number.isFinite(n) ? n : undefined;
};

/**
 * Ép chuỗi "12.5" → số thực. Trả undefined nếu không hợp lệ.
 */
const toFloat = (val) => {
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : undefined;
};

/**
 * Chuẩn hoá array từ query string.
 * Express parse "?ids=1&ids=2" → ["1","2"]
 *               "?ids=1,2,3"   → "1,2,3"  → split → ["1","2","3"]
 */
const toArray = (val) => {
    if (!val) return undefined;
    if (Array.isArray(val)) return val.flatMap((v) => v.split(","));
    if (typeof val === "string") return val.split(",").filter(Boolean);
    return undefined;
};

/**
 * Tập hợp các bộ chuyển đổi cơ bản.
 * Module có thể truyền thêm converter riêng vào `preprocess`.
 */
export const converters = { toInt, toFloat, toArray };

// ── 2. Preprocess engine ──────────────────────────────────────────

/**
 * preprocessConfig: map field → { type, arrayItemType? }
 *
 * Ví dụ:
 *   {
 *     page:     { type: 'int' },
 *     limit:    { type: 'int' },
 *     minPrice: { type: 'float' },
 *     ids:      { type: 'array', arrayItemType: 'int' },
 *   }
 */
const SUPPORTED_TYPES = {
    int: toInt,
    float: toFloat,
    array: toArray,
    // 'string' — giữ nguyên, không cần xử lý
};

/**
 * Áp dụng preprocessConfig lên raw query.
 * Các field không khai báo trong config → giữ nguyên (string).
 */
const preprocessQuery = (rawQuery, preprocessConfig = {}) => {
    const result = { ...rawQuery };

    for (const [field, cfg] of Object.entries(preprocessConfig)) {
        const raw = rawQuery[field];
        if (raw === undefined || raw === "") {
            delete result[field]; // để Zod dùng .default()
            continue;
        }

        const converter = SUPPORTED_TYPES[cfg.type];
        if (!converter) continue;

        let converted = converter(raw);

        // Nếu là array và cần ép kiểu từng phần tử
        if (cfg.type === "array" && cfg.arrayItemType && Array.isArray(converted)) {
            const itemConverter = SUPPORTED_TYPES[cfg.arrayItemType];
            if (itemConverter) {
                converted = converted.map((v) => itemConverter(v) ?? v);
            }
        }

        result[field] = converted;
    }

    return result;
};

// ── 3. parseQuery — hàm công khai ────────────────────────────────

/**
 * @param {object} rawQuery  — req.query từ Express
 * @param {ZodSchema} schema — schema Zod của từng module
 * @param {object} [preprocessConfig] — override type-cast rules
 *
 * @returns {object} parsed  — object đã validate + default
 * @throws  {ValidationError} nếu data không hợp lệ
 */
export const parseQuery = (rawQuery, schema, preprocessConfig = {}) => {
    const preprocessed = preprocessQuery(rawQuery, preprocessConfig);

    const result = schema.safeParse(preprocessed);

    if (!result.success) {
        // Gom lỗi thành message dễ đọc
        const messages = result.error.errors.map(
            (e) => `${e.path.join(".")}: ${e.message}`
        );
        throw new BadRequestError(messages.join(" | "));
    }

    return result.data;
};
