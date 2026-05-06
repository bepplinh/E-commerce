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

    const attributeFilters = await Promise.all(
        attributes.map(async (attr) => {
            const values = await productRepository.getUniqueValuesByAttributeId(attr.id);
            return {
                id: attr.id,
                name: attr.name,
                values,
            };
        })
    );

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

    return {
        products,
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
