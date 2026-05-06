import { UnprocessableEntityError } from "../../../utils/app-error.js";

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
 * Helper để lưu ảnh của Product hoặc Variant (nếu có variantId)
 */
export const createProductImages = async (tx, productId, images, variantId = null) => {
    if (!images || images.length === 0) return;

    return tx.productImage.createMany({
        data: images.map((img, idx) => ({
            productId,
            variantId,
            imageUrl: img.url,
            isPrimary: img.isPrimary ?? false,
            sortOrder: idx,
        })),
    });
};

/**
 * Helper để tạo Options và OptionValues, trả về map tra cứu ID
 * Map format: { "Color:White": optionValueId }
 */
export const createProductOptions = async (tx, productId, options) => {
    const optionValueMap = {};
    if (!options || options.length === 0) return optionValueMap;

    for (const option of options) {
        // Tìm hoặc tạo mới Attribute chung (Size, Color, ...)
        const attribute = await tx.attribute.upsert({
            where: { name: option.name },
            update: {},
            create: { name: option.name },
        });

        const createdOption = await tx.productOption.create({
            data: {
                productId,
                attributeId: attribute.id,
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
            optionValueMap[`${option.name}:${ov.value}`] = ov.id;
        }
    }

    return optionValueMap;
};

const buildVariantOptionValueRows = (variantId, attributes, optionValueMap, errorPrefix) => {
    const rows = [];

    for (const [optionName, optionValue] of Object.entries(attributes ?? {})) {
        const key = `${optionName}:${optionValue}`;
        const optionValueId = optionValueMap[key];

        if (!optionValueId) {
            throw new UnprocessableEntityError(
                `${errorPrefix} "${key}" không tìm thấy trong danh sách options đã khai báo.`
            );
        }

        rows.push({
            variantId,
            optionValueId,
        });
    }

    return rows;
};

const syncVariantOptionValues = async (tx, variantId, attributes, optionValueMap, errorPrefix) => {
    if (attributes === undefined) {
        return;
    }

    await tx.variantOptionValue.deleteMany({
        where: { variantId },
    });

    const rows = buildVariantOptionValueRows(variantId, attributes, optionValueMap, errorPrefix);
    if (rows.length > 0) {
        await tx.variantOptionValue.createMany({ data: rows });
    }
};

const buildVariantUpdateData = (variant) => {
    const updateData = {};
    const fields = ["sku", "price", "stockQuantity", "isActive"];

    for (const field of fields) {
        if (variant[field] !== undefined) {
            updateData[field] = variant[field];
        }
    }

    return updateData;
};

const createVariantWithRelations = async (tx, productId, variant, optionValueMap, errorPrefix) => {
    const createdVariant = await tx.productVariant.create({
        data: {
            productId,
            sku: variant.sku,
            price: variant.price,
            stockQuantity: variant.stockQuantity ?? 0,
            isActive: variant.isActive ?? true,
        },
    });

    if (variant.images && variant.images.length > 0) {
        await createProductImages(tx, productId, variant.images, createdVariant.id);
    }

    await syncVariantOptionValues(tx, createdVariant.id, variant.attributes ?? {}, optionValueMap, errorPrefix);

    return createdVariant;
};

const updateVariantWithRelations = async (tx, productId, variant, optionValueMap, errorPrefix) => {
    const updateData = buildVariantUpdateData(variant);

    const updatedVariant = await tx.productVariant.update({
        where: { id: variant.id },
        data: updateData,
    });

    if (variant.images !== undefined) {
        await replaceProductImages(tx, productId, variant.images, updatedVariant.id);
    }

    await syncVariantOptionValues(tx, updatedVariant.id, variant.attributes, optionValueMap, errorPrefix);

    return updatedVariant;
};

/**
 * Helper để tạo các Variants, gắn ảnh riêng và liên kết OptionValues
 */
export const createProductVariants = async (tx, productId, variants, optionValueMap) => {
    const createdVariants = [];
    if (!variants || variants.length === 0) return createdVariants;

    for (const variant of variants) {
        createdVariants.push(
            await createVariantWithRelations(
                tx,
                productId,
                variant,
                optionValueMap,
                "Thuộc tính"
            )
        );
    }

    return createdVariants;
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

/**
 * Helper để replace ảnh (xoá cũ, thêm mới)
 */
export const replaceProductImages = async (tx, productId, images, variantId = null) => {
    await tx.productImage.deleteMany({
        where: {
            productId,
            variantId,
        },
    });

    if (images && images.length > 0) {
        await createProductImages(tx, productId, images, variantId);
    }
};

/**
 * Helper để upsert variants (cập nhật/tạo mới, xoá mềm variant không có trong payload)
 */
export const upsertProductVariants = async (tx, productId, variants, optionValueMap) => {
    const processedVariants = [];
    if (!variants) return processedVariants;

    const variantIdsInPayload = variants.filter((variant) => variant.id).map((variant) => variant.id);

    if (variantIdsInPayload.length > 0) {
        await tx.productVariant.updateMany({
            where: {
                productId,
                id: { notIn: variantIdsInPayload },
            },
            data: { isActive: false },
        });
    } else {
        await tx.productVariant.updateMany({
            where: { productId },
            data: { isActive: false },
        });
    }

    for (const variant of variants) {
        if (variant.id) {
            processedVariants.push(
                await updateVariantWithRelations(
                    tx,
                    productId,
                    variant,
                    optionValueMap,
                    "Thuộc tính"
                )
            );
            continue;
        }

        processedVariants.push(
            await createVariantWithRelations(
                tx,
                productId,
                variant,
                optionValueMap,
                "Thuộc tính"
            )
        );
    }

    return processedVariants;
};
