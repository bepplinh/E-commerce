import * as productService from "./product.service.js";

const getFilter = async (req, res, next) => {
    try {
        const data = await productService.getFilterData();
        res.status(200).json({ data, status: "success" });
    } catch (err) { next(err); }
};

const getProduct = async (req, res, next) => {
    try {
        const data = await productService.getProductList(req.query);
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
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            status: "success",
            message: "Tạo sản phẩm thành công",
            data: product,
        });
    } catch (err) { next(err); }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (err) { next(err); }
};

export { getFilter, getProduct, getProductDetail, createProduct, updateProduct };
