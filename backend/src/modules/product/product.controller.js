import * as productService from "./product.service.js";

const getFilter = async (req, res, next) => {
    try {
        const data = await productService.getFilterData();
        res.status(200).json({ data, status: "success" });
    } catch (err) { next(err); }
};

const getProduct = async (req, res, next) => {
    try {
        const { category, color, brand, size, minPrice, maxPrice, page, limit } = req.query;
        const data = await productService.getProductList({
            category, color, brand, size,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
        });
        res.status(200).json({ data, status: "success" });
    } catch (err) { next(err); }
};

const getProductDetail = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const product = await productService.getProductDetail(slug);
        res.status(200).json({ data: product, status: "success" });
    } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
    try {
        // Body đã được validate bằng Zod qua validate middleware
        // imageUrls lấy từ API /upload (optional, mặc định [])
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            status: "success",
            message: "Tạo sản phẩm thành công",
            data: product,
        });
    } catch (err) { next(err); }
};

export { getFilter, getProduct, getProductDetail, createProduct };

