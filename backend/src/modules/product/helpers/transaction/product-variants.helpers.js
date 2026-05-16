import { BadRequestError, UnprocessableEntityError } from "../../../../utils/app-error.js";
import { createProductImages, patchProductImages } from "./product-images.helpers.js";

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

const updateVariantWithRelations = async (tx, productId, existingVariant, variant, optionValueMap, errorPrefix) => {
    const updateData = buildVariantUpdateData(variant);

    const updatedVariant = await tx.productVariant.update({
        where: { id: variant.id },
        data: updateData,
    });

    if (variant.images !== undefined) {
        await patchProductImages(tx, productId, existingVariant.images ?? [], variant.images, updatedVariant.id);
    }

    const mergedAttributes = {
        ...(variant.attributes ?? {}),
    };

    await syncVariantOptionValues(tx, updatedVariant.id, mergedAttributes, optionValueMap, errorPrefix);

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

export const upsertProductVariants = async (tx, productId, existingVariants, variants, optionValueMap) => {
    const processedVariants = [];
    if (variants === undefined) return processedVariants;

    const existingVariantById = new Map((existingVariants ?? []).map((variant) => [variant.id, variant]));

    const incomingIds = variants.map(v => v.id).filter(Boolean);
    const variantsToDelete = (existingVariants ?? []).filter(v => !incomingIds.includes(v.id));

    if (variantsToDelete.length > 0) {
        await tx.productVariant.deleteMany({
            where: { id: { in: variantsToDelete.map(v => v.id) } }
        });
    }

    if (variants.length === 0) return processedVariants;

    for (const variant of variants) {
        if (variant.id) {
            const existingVariant = existingVariantById.get(variant.id);

            if (!existingVariant) {
                throw new UnprocessableEntityError(`Variant ${variant.id} không tồn tại trong sản phẩm này.`);
            }

            processedVariants.push(
                await updateVariantWithRelations(
                    tx,
                    productId,
                    existingVariant,
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
