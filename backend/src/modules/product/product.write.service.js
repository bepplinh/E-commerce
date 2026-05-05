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
    replaceProductImages,
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
    let existingProduct = await productRepository.getProductBySlug(slug);

    while (existingProduct) {
        slug = `${baseSlug}-${counter}`;
        existingProduct = await productRepository.getProductBySlug(slug);
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

    const { images, variants, ...productFields } = body;

    if (productFields.name && productFields.name !== product.name && !productFields.slug) {
        productFields.slug = await generateUniqueSlug(productFields.name);
    }

    const optionValueMap = buildOptionValueLookup(product.options);

    return prisma.$transaction(async ($tx) => {
        await updateBaseProduct($tx, productId, productFields);

        if (images) {
            await replaceProductImages($tx, productId, images, null);
        }

        if (variants) {
            await upsertProductVariants($tx, productId, variants, optionValueMap);
        }

        return $tx.product.findUnique({
            where: { id: productId },
            include: productDetailInclude,
        });
    });
};

export { createProduct, updateProduct };
