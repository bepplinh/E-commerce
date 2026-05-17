/**
 * ──────────────────────────────────────────────────────────────────
 *  PRODUCT FILTER UTILS  (modules/product/utils/product-filter.utils.js)
 *
 *  Nhận parsed query (đã qua parseProductQuery) và trả về:
 *    - buildWhereClause(query)   → Prisma `where` object
 *    - buildOrderByClause(query) → Prisma `orderBy` object
 *    - buildPagination(query)    → { skip, take }
 *
 *  Pattern: Mỗi bộ lọc là một hàm nhỏ độc lập, được gộp lại
 *  bằng combineFilters → dễ test + dễ thêm mới.
 * ──────────────────────────────────────────────────────────────────
 */

// ── Các mapper helper ─────────────────────────────────────────────

/**
 * Lọc tất cả các function trả về object không rỗng rồi merge lại.
 * @param {...Function} filterFns — mỗi fn nhận query và trả { [field]: condition } | {}
 */
const combineFilters = (...filterFns) =>
    (query) =>
        filterFns.reduce((acc, fn) => {
            const partial = fn(query);
            return partial ? { ...acc, ...partial } : acc;
        }, {});

// ── Filter functions ──────────────────────────────────────────────
//  Mỗi function nhận toàn bộ `query` và trả partial Prisma WHERE.
//  Trả {} (empty) nếu field không có trong query.

/** Lọc theo isActive */
const filterByStatus = ({ isActive }) => ({
    isActive,
});

/** Tìm kiếm theo tên (case-insensitive) */
const filterByKeyword = ({ keyword }) => {
    if (!keyword) return {};
    return {
        name: { contains: keyword, mode: "insensitive" },
    };
};

/** Lọc theo category */
const filterByCategory = ({ categoryId }) => {
    if (!categoryId) return {};
    return { categoryId };
};

/** Lọc theo nhiều brand */
const filterByBrands = ({ brandIds }) => {
    if (!brandIds?.length) return {};
    return { brandId: { in: brandIds } };
};

/** Lọc theo khoảng giá (dựa trên basePrice của product) */
const filterByPrice = ({ minPrice, maxPrice }) => {
    if (minPrice == null && maxPrice == null) return {};

    const priceFilter = {};
    if (minPrice != null) priceFilter.gte = minPrice;
    if (maxPrice != null) priceFilter.lte = maxPrice;

    return { basePrice: priceFilter };
};

/**
 * Lọc theo attribute value IDs (dynamic attributes).
 * Chỉ lấy sản phẩm có ÍT NHẤT MỘT variant chứa attribute value đó.
 */
const filterByAttributes = ({ attributeValueIds }) => {
    if (!attributeValueIds?.length) return {};
    return {
        variants: {
            some: {
                optionValues: {
                    some: { optionValueId: { in: attributeValueIds } },
                },
            },
        },
    };
};

// ── Tổng hợp WHERE clause ─────────────────────────────────────────

/**
 * Gộp tất cả filter thành Prisma `where`.
 * Thêm filter mới: chỉ cần tạo fn và thêm vào danh sách.
 */
export const buildWhereClause = combineFilters(
    filterByStatus,
    filterByKeyword,
    filterByCategory,
    filterByBrands,
    filterByPrice,
    filterByAttributes,
    // → Thêm filter mới ở đây: filterByRating, filterByTags, ...
);

// ── ORDER BY clause ───────────────────────────────────────────────

/**
 * Map từ query `sortBy` → Prisma orderBy field.
 * "price" → sort theo variant price thấp nhất (aggregation).
 */
const SORT_BY_MAP = {
    createdAt: (order) => ({ createdAt: order }),
    name:      (order) => ({ name: order }),
    soldCount: (order) => ({ soldCount: order }),
    rating:    (order) => ({ avgRating: order }),
    price:     (order) => ({
        variants: { _min: { price: order } },
    }),
};

/**
 * @param {{ sortBy: string, sortOrder: 'asc'|'desc' }} query
 * @returns Prisma `orderBy` value
 */
export const buildOrderByClause = ({ sortBy, sortOrder }) => {
    const builder = SORT_BY_MAP[sortBy] ?? SORT_BY_MAP.createdAt;
    return builder(sortOrder);
};

// ── Pagination ────────────────────────────────────────────────────

/**
 * @param {{ page: number, limit: number }} query
 * @returns {{ skip: number, take: number }}
 */
export const buildPagination = ({ page, limit }) => ({
    skip: (page - 1) * limit,
    take: limit,
});
