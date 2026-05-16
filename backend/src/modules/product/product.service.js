import productRepository from "./product.repository.js";
import { NotFoundError } from "../../utils/app-error.js";
import { buildWhereClause } from "./utils/product-filter.utils.js";
import { parseProductListQuery } from "./utils/product-query.utils.js";
import {
    createProduct as createProductCommand,
    updateProduct as updateProductCommand,
} from "./product.write.service.js";

const getFilterData = async () => {
    const [brands, categories, attributes] = await Promise.all([
        productRepository.getBrands(),
        productRepository.getCategory(),
        productRepository.getAttributes(),
    ]);

    const attributeIds = attributes.map((attr) => attr.id);
    const attributeValues = attributeIds.length > 0
        ? await productRepository.getUniqueValuesByAttributeIds(attributeIds)
        : [];

    const valuesByAttributeId = new Map();
    for (const value of attributeValues) {
        const attributeId = value.option.attributeId;
        const existingValues = valuesByAttributeId.get(attributeId) ?? [];
        existingValues.push({
            value: value.value,
            metadata: value.metadata,
        });
        valuesByAttributeId.set(attributeId, existingValues);
    }

    const attributeFilters = attributes.map((attr) => ({
        id: attr.id,
        name: attr.name,
        values: (valuesByAttributeId.get(attr.id) ?? []).sort((a, b) =>
            a.value.localeCompare(b.value, "vi")
        ),
    }));

    return {
        brands,
        categories,
        attributes: attributeFilters,
    };
};

const getProductList = async (query) => {
    const { category, color, brand, size, minPrice, maxPrice, page, limit } = parseProductListQuery(query);
    const where = buildWhereClause({ category, brand, color, size, minPrice, maxPrice });
    const skip = (page - 1) * limit;

    const [products, total] = await productRepository.getProducts(where, skip, limit);

    const processedProducts = products.map((product) => {
        const reviewCount = product._count.reviews;
        const averageRating =
            reviewCount > 0
                ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
                  reviewCount
                : 0;

        // Trích xuất danh sách màu sắc duy nhất từ các biến thể
        const colors = new Set();
        product.variants.forEach((variant) => {
            variant.optionValues.forEach((ov) => {
                const attrName =
                    ov.optionValue.option.attribute.name.toLowerCase();
                if (attrName === "color" || attrName === "màu sắc") {
                    colors.add(ov.optionValue.value);
                }
            });
        });

        const { reviews, _count, ...rest } = product;

        return {
            ...rest,
            averageRating: Math.round(averageRating * 10) / 10,
            reviewCount,
            colors: Array.from(colors),
            basePrice: Number(product.basePrice),
        };
    });

    return {
        products: processedProducts,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const getProductDetail = async (slug) => {
    const product = await productRepository.getProductBySlug(slug);
    if (!product) throw new NotFoundError("Không tìm thấy sản phẩm");

    return product;
};

const createProduct = async (body) => createProductCommand(body);

const updateProduct = async (id, body) => updateProductCommand(id, body);

export { getFilterData, getProductList, getProductDetail, createProduct, updateProduct };
