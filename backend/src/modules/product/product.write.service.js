import slugify from "slugify";
import prisma from "../../config/prisma.js";
import { BadRequestError, NotFoundError } from "../../utils/app-error.js";
import productRepository from "./product.repository.js";
import { buildOptionValueLookup } from "./utils/product-option.utils.js";
import {
    createBaseProduct,
    createProductImages,
    createProductOptions,
    createProductVariants,
    updateBaseProduct,
    patchProductImages,
    upsertProductOptions,
    upsertProductVariants,
} from "./helpers/transaction.helpers.js";
import { productDetailInclude } from "./product.queries.js";

const generateUniqueSlug = async (name) => {
    const baseSlug = slugify(name, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        locale: "vi",
    });

    let slug = baseSlug;
    let counter = 1;
    let existingProduct = await productRepository.getProductSlugBySlug(slug);

    while (existingProduct) {
        slug = `${baseSlug}-${counter}`;
        existingProduct = await productRepository.getProductSlugBySlug(slug);
        counter++;
    }

    return slug;
};

const validateProductId = (id) => {
    const productId = Number(id);

    if (!Number.isInteger(productId) || productId <= 0) {
        throw new BadRequestError("ID sản phẩm không hợp lệ");
    }

    return productId;
};

const createProduct = async (body) => {
    const { images, options, variants, ...productFields } = body;

    if (!productFields.slug) {
        productFields.slug = await generateUniqueSlug(productFields.name);
    }

    return prisma.$transaction(async ($tx) => {
        const product = await createBaseProduct($tx, productFields);
        await createProductImages($tx, product.id, images ?? [], null);
        const optionValueMap = await createProductOptions($tx, product.id, options ?? []);
        await createProductVariants($tx, product.id, variants, optionValueMap);

        return $tx.product.findUnique({
            where: { id: product.id },
            include: productDetailInclude,
        });
    });
};

const updateProduct = async (id, body) => {
    const productId = validateProductId(id);
    const product = await productRepository.getProductById(productId);

    if (!product) {
        throw new NotFoundError("Không tìm thấy sản phẩm");
    }

    const { images, options, variants, ...productFields } = body;

    if (productFields.name && productFields.name !== product.name && !productFields.slug) {
        productFields.slug = await generateUniqueSlug(productFields.name);
    }

    return prisma.$transaction(async ($tx) => {
        const currentProduct = await $tx.product.findUnique({
            where: { id: productId },
            include: {
                images: true,
                options: {
                    include: {
                        attribute: true,
                        values: true,
                    },
                },
                variants: {
                    include: {
                        images: true,
                        optionValues: {
                            include: {
                                optionValue: {
                                    include: {
                                        option: {
                                            include: {
                                                attribute: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!currentProduct) {
            throw new NotFoundError("Không tìm thấy sản phẩm");
        }

        const optionValueMap = options !== undefined
            ? await upsertProductOptions($tx, productId, currentProduct.options, options)
            : buildOptionValueLookup(currentProduct.options);

        await updateBaseProduct($tx, productId, productFields);

        if (images !== undefined) {
            await patchProductImages($tx, productId, currentProduct.images, images, null);
        }

        if (variants !== undefined) {
            await upsertProductVariants($tx, productId, currentProduct.variants, variants, optionValueMap);
        }

        return $tx.product.findUnique({
            where: { id: productId },
            include: productDetailInclude,
        });
    });
};

export { createProduct, updateProduct };
