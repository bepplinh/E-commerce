import productRepository from "./product.repository.js";
import { NotFoundError } from "../../utils/app-error.js";
import { buildWhereClause, buildOrderByClause, buildPagination } from "./utils/product-filter.utils.js";
import { parseProductQuery } from "./utils/product-query.utils.js";
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

const getProductList = async (rawQuery) => {
    // 1. Parse + validate raw req.query → throw 400 nếu không hợp lệ
    const query = parseProductQuery(rawQuery);

    // 2. Build Prisma args từ parsed query
    const where   = buildWhereClause(query);
    const orderBy = buildOrderByClause(query);
    const { skip, take } = buildPagination(query);

    // 3. Gọi repository (parallel: data + count)
    const [items, total] = await Promise.all([
        productRepository.findMany({ where, orderBy, skip, take }),
        productRepository.count({ where }),
    ]);

    // 4. Trả về data + pagination meta
    return {
        items,
        pagination: {
            page:       query.page,
            limit:      query.limit,
            total,
            totalPages: Math.ceil(total / query.limit),
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
