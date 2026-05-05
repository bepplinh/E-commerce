// Dùng cho API lấy danh sách (getProducts)
export const productListSelect = {
    id: true,
    name: true,
    slug: true,
    basePrice: true,
    brand: {
        select: { name: true, slug: true },
    },
    // Chỉ lấy Global Thumbnail (variantId null + isPrimary)
    images: {
        where: { isPrimary: true, variantId: null },
        select: { imageUrl: true },
        take: 1,
    },
    variants: {
        where: { isActive: true },
        select: { price: true },
    },
};

// Dùng cho API lấy chi tiết (getProductBySlug)
export const productDetailInclude = {
    brand: true,
    category: true,
    // Trả về toàn bộ ảnh (cả global lẫn per-variant)
    images: true,
    options: {
        include: { values: true },
    },
    variants: {
        where: { isActive: true },
        include: {
            // Ảnh riêng của variant
            images: true,
            optionValues: {
                include: { optionValue: true },
            },
        },
    },
};
