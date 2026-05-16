// Dùng cho API lấy danh sách (getProducts)
export const productListSelect = {
    id: true,
    name: true,
    slug: true,
    basePrice: true,
    brand: {
        select: { name: true, slug: true },
    },
    category: {
        select: { name: true, slug: true },
    },
    // Chỉ lấy Global Thumbnail (variantId null + isPrimary)
    images: {
        where: { isPrimary: true, variantId: null },
        select: { imageUrl: true, isPrimary: true },
        take: 1,
    },
    variants: {
        where: { isActive: true },
        select: { 
            price: true,
            optionValues: {
                select: {
                    optionValue: {
                        select: {
                            value: true,
                            metadata: true,
                            option: {
                                select: {
                                    attribute: {
                                        select: { name: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    _count: {
        select: { reviews: true }
    },
    reviews: {
        select: { rating: true }
    }
};

// Dùng cho API lấy chi tiết (getProductBySlug)
export const productDetailInclude = {
    brand: true,
    category: true,
    // Trả về toàn bộ ảnh (cả global lẫn per-variant)
    images: true,
    options: {
        include: { attribute: true, values: true },
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
