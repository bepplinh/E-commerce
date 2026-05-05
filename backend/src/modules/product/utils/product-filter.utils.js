/**
 * Xây dựng Prisma `where` object cho việc lọc sản phẩm.
 * Mỗi giá trị variant (color, size) được tách thành mệnh đề AND riêng.
 */
export const buildWhereClause = ({ category, brand, color, size, minPrice, maxPrice }) => {
    const where = { isActive: true };

    if (category) where.category = { slug: category };
    if (brand) where.brand = { slug: brand };

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.basePrice = {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
        };
    }

    const variantFilters = [color, size]
        .filter(Boolean)
        .map((value) => ({
            variants: {
                some: { optionValues: { some: { optionValue: { value } } } },
            },
        }));

    if (variantFilters.length > 0) where.AND = variantFilters;

    return where;
};
