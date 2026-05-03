import prisma from "../../config/prisma.js";

const getBrands = () => {
    return prisma.brand.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        },
        orderBy: {
            name: "asc",
        },
    });
};

const getCategory = () => {
    return prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
};

/**
 * Lấy danh sách các giá trị option DISTINCT theo tên option.
 * Dùng cho sidebar filter (Color, Size, ...).
 * Chỉ lấy những giá trị đang có trong sản phẩm active.
 */
const getFilterOptions = async (optionName) => {
    return prisma.optionValue.findMany({
        where: {
            option: { name: optionName },
            variantMappings: {
                some: {
                    variant: { product: { isActive: true } },
                },
            },
        },
        distinct: ["value"],
        select: { value: true, metadata: true },
        orderBy: { value: "asc" },
    });
};

const getProducts = (where, skip, take) => {
    return Promise.all([
        prisma.product.findMany({
            where,
            skip,
            take,
            select: {
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
                    select: { price: true },
                },
            },
        }),
        prisma.product.count({ where }),
    ]);
};

const getProductBySlug = (slug) => {
    return prisma.product.findUnique({
        where: { slug },
        include: {
            brand: true,
            category: true,
            // Trả về toàn bộ ảnh (cả global lẫn per-variant)
            images: true,
            options: {
                include: { values: true },
            },
            variants: {
                include: {
                    // Ảnh riêng của variant
                    images: true,
                    optionValues: {
                        include: { optionValue: true },
                    },
                },
            },
        },
    });
};

/**
 * Tạo Product hoàn chỉnh trong một Transaction:
 * Product → Global Images → Options → OptionValues → Variants → Variant Images → VariantOptionValues
 */
const createProductWithVariants = async ({ productData, images, options, variants }) => {
    return prisma.$transaction(async ($tx) => {
        // ── 1. Tạo Product ──────────────────────────────────────────────────────
        const product = await $tx.product.create({
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

        // ── 2. Lưu ảnh chung của Product (Global Images — variantId = null) ────
        if (images && images.length > 0) {
            await $tx.productImage.createMany({
                data: images.map((img, idx) => ({
                    productId: product.id,
                    variantId: null,
                    imageUrl: img.url,
                    isPrimary: img.isPrimary ?? false,
                    sortOrder: idx,
                })),
            });
        }

        // ── 3. Tạo Options + OptionValues ────────────────────────────────────────
        // optionValueMap: { "Color:White" => optionValueId }
        // dùng để tra cứu khi liên kết variant với option values
        const optionValueMap = {};

        for (const option of options ?? []) {
            const createdOption = await $tx.productOption.create({
                data: {
                    productId: product.id,
                    name: option.name,
                    values: {
                        create: option.values.map((v) => ({
                            value: v.value,
                            metadata: v.metadata ?? null,
                        })),
                    },
                },
                include: { values: true },
            });

            for (const ov of createdOption.values) {
                // key dạng "Color:White" phải khớp với attributes của variant
                optionValueMap[`${option.name}:${ov.value}`] = ov.id;
            }
        }

        // ── 4. Tạo Variants + Variant Images + VariantOptionValues ───────────────
        const createdVariants = [];

        for (const variant of variants ?? []) {
            const createdVariant = await $tx.productVariant.create({
                data: {
                    productId: product.id,
                    sku: variant.sku,
                    price: variant.price,
                    stockQuantity: variant.stockQuantity ?? 0,
                },
            });

            // 4a. Lưu ảnh riêng của Variant (variantId được set)
            if (variant.images && variant.images.length > 0) {
                await $tx.productImage.createMany({
                    data: variant.images.map((img, idx) => ({
                        productId: product.id,
                        variantId: createdVariant.id,
                        imageUrl: img.url,
                        isPrimary: img.isPrimary ?? false,
                        sortOrder: idx,
                    })),
                });
            }

            // 4b. Liên kết Variant với các OptionValue qua attributes
            const variantOptionValues = [];
            for (const [optionName, optionValueStr] of Object.entries(variant.attributes ?? {})) {
                const key = `${optionName}:${optionValueStr}`;
                const optionValueId = optionValueMap[key];

                if (!optionValueId) {
                    throw new Error(`Attribute "${key}" không tìm thấy trong danh sách options đã khai báo.`);
                }

                variantOptionValues.push({
                    variantId: createdVariant.id,
                    optionValueId: optionValueId,
                });
            }

            if (variantOptionValues.length > 0) {
                await $tx.variantOptionValue.createMany({ data: variantOptionValues });
            }

            createdVariants.push(createdVariant);
        }

        return { ...product, variants: createdVariants };
    });
};

export { getBrands, getCategory, getFilterOptions, getProducts, getProductBySlug, createProductWithVariants };
