import prisma from "../../config/prisma.js";
import { productListSelect, productDetailInclude } from "./product.queries.js";

class ProductRepository {
    getProductSlugBySlug(slug) {
        return prisma.product.findUnique({
            where: { slug },
            select: { id: true },
        });
    }

    getBrands() {
        return prisma.brand.findMany({
            select: { id: true, name: true, slug: true },
            orderBy: { name: "asc" },
        });
    }

    getCategory() {
        return prisma.category.findMany({
            orderBy: { name: "asc" },
        });
    }

    getAttributes() {
        return prisma.attribute.findMany({
            orderBy: { name: "asc" },
        });
    }

    getUniqueValuesByAttributeId(attributeId) {
        return prisma.optionValue.findMany({
            where: {
                option: { attributeId: attributeId },
            },
            distinct: ["value"],
            select: { value: true, metadata: true },
            orderBy: { value: "asc" },
        });
    }

    getUniqueValuesByAttributeIds(attributeIds) {
        return prisma.optionValue.findMany({
            where: {
                option: {
                    attributeId: { in: attributeIds },
                },
            },
            distinct: ["value", "optionId"],
            select: {
                value: true,
                metadata: true,
                option: {
                    select: {
                        attributeId: true,
                    },
                },
            },
        });
    }

    getProducts(where, skip, take, orderBy = { createdAt: "desc" }) {
        return Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take,
                orderBy,
                select: productListSelect,
            }),
            prisma.product.count({ where }),
        ]);
    }

    getProductBySlug(slug) {
        return prisma.product.findUnique({
            where: { slug },
            include: productDetailInclude,
        });
    }

    getProductById(id) {
        return prisma.product.findUnique({
            where: { id },
            include: {
                options: {
                    include: {
                        attribute: true,
                        values: true,
                    },
                },
            },
        });
    }

    findVariantById(variantId) {
        return prisma.productVariant.findUnique({
            where: {
                id: variantId,
            },
            include: { product: true },
        });
    }

    findVariantsById(variantIds) {
        return prisma.productVariant.findMany({
            where: {
                id: { in: variantIds },
            },
            include: { product: true },
        });
    }
}

export default new ProductRepository();
