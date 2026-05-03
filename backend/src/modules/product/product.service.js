import { NotFoundError } from "../../utils/app-error.js";
import * as productRepository from "./product.repository.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Tạo slug từ tên sản phẩm (hỗ trợ tiếng Việt).
 * Append timestamp để đảm bảo unique.
 */
const generateSlug = (name) =>
    name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-") +
    "-" +
    Date.now();

/**
 * Xây dựng Prisma `where` object cho việc lọc sản phẩm.
 * Mỗi giá trị variant (color, size) được tách thành mệnh đề AND riêng.
 */
const buildWhereClause = ({ category, brand, color, size, minPrice, maxPrice }) => {
    const where = { isActive: true };

    if (category) where.category = { slug: category };
    if (brand)    where.brand    = { slug: brand };

    if (minPrice !== undefined || maxPrice !== undefined) {
        where.basePrice = {
            ...(minPrice !== undefined && { gte: minPrice }),
            ...(maxPrice !== undefined && { lte: maxPrice }),
        };
    }

    const variantFilters = [color, size]
        .filter(Boolean)
        .map((value) => ({
            variants: {
                some: { optionValues: { some: { optionValue: { value } } } },
            },
        }));

    if (variantFilters.length > 0) where.AND = variantFilters;

    return where;
};

// ── Services ──────────────────────────────────────────────────────────────────

const getFilterData = async () => {
    const [brands, categories, colors, sizes] = await Promise.all([
        productRepository.getBrands(),
        productRepository.getCategory(),
        productRepository.getFilterOptions("Color"),
        productRepository.getFilterOptions("Size"),
    ]);

    return { brands, categories, colors, sizes };
};

const getProductList = async ({ category, color, brand, size, minPrice, maxPrice, page, limit = 10 }) => {
    const where = buildWhereClause({ category, brand, color, size, minPrice, maxPrice });
    const skip  = (page - 1) * limit;

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

/**
 * Tạo sản phẩm mới.
 * Dữ liệu đã được validate bằng Zod qua validate middleware trước khi vào đây.
 * - body.imageUrls: mảng URL ảnh từ API upload (có thể rỗng/null)
 */
const createProduct = async (body) => {
    const { images, options, variants, ...productFields } = body;

    if (!productFields.slug) {
        productFields.slug = generateSlug(productFields.name);
    }

    return productRepository.createProductWithVariants({
        productData: productFields,
        images: images ?? [],
        options: options ?? [],
        variants,
    });
};

export { getFilterData, getProductList, getProductDetail, createProduct };
