import { BadRequestError, UnprocessableEntityError } from "../../../../utils/app-error.js";

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
            sortOrder: img.sortOrder ?? idx,
        })),
    });
};

const buildImageUpdateData = (image) => {
    const updateData = {};

    if (image.url !== undefined) {
        updateData.imageUrl = image.url;
    }

    if (image.isPrimary !== undefined) {
        updateData.isPrimary = image.isPrimary;
    }

    if (image.sortOrder !== undefined) {
        updateData.sortOrder = image.sortOrder;
    }

    return updateData;
};

export const patchProductImages = async (tx, productId, existingImages, images, variantId = null) => {
    if (images === undefined) return;

    const relevantExistingImages = (existingImages ?? []).filter(img => img.variantId === variantId);

    const incomingIds = images.map(img => img.id).filter(Boolean);
    const existingIds = relevantExistingImages.map(img => img.id);
    const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));

    if (idsToDelete.length > 0) {
        await tx.productImage.deleteMany({
            where: { id: { in: idsToDelete } }
        });
    }

    if (images.length === 0) return;

    const existingById = new Map(relevantExistingImages.map((image) => [image.id, image]));
    let nextSortOrder = relevantExistingImages.reduce((max, image) => Math.max(max, image.sortOrder ?? 0), -1) + 1;

    for (const image of images) {
        if (image.id) {
            if (!existingById.has(image.id)) {
                throw new UnprocessableEntityError(`Ảnh ${image.id} không tồn tại trong sản phẩm này.`);
            }

            const updateData = buildImageUpdateData(image);
            if (Object.keys(updateData).length === 0) continue;

            await tx.productImage.update({
                where: { id: image.id },
                data: updateData,
            });
            continue;
        }

        if (!image.url) {
            throw new BadRequestError("URL ảnh là bắt buộc khi thêm ảnh mới");
        }

        await tx.productImage.create({
            data: {
                productId,
                variantId,
                imageUrl: image.url,
                isPrimary: image.isPrimary ?? false,
                sortOrder: image.sortOrder ?? nextSortOrder++,
            },
        });
    }
};
