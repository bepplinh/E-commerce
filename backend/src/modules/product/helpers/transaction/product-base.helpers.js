/**
 * Helper để tạo bảng Product chính
 */
export const createBaseProduct = async (tx, productData) => {
    return tx.product.create({
        data: {
            categoryId: productData.categoryId,
            brandId: productData.brandId ?? null,
            name: productData.name,
            slug: productData.slug,
            description: productData.description ?? null,
            basePrice: productData.basePrice,
            isActive: productData.isActive ?? true,
        },
    });
};

/**
 * Helper để update bảng Product chính
 */
export const updateBaseProduct = async (tx, productId, productData) => {
    const updateData = {};
    const fields = ["categoryId", "brandId", "name", "slug", "description", "basePrice", "isActive"];

    for (const field of fields) {
        if (productData[field] !== undefined) {
            updateData[field] = productData[field];
        }
    }

    if (Object.keys(updateData).length === 0) return null;

    return tx.product.update({
        where: { id: productId },
        data: updateData,
    });
};
