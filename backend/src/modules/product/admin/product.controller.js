import ApiResponse from "../../../helpers/response.helper.js";
import * as productService from "../product.service.js";

const createProduct = async (req, res) => {
    const product = await productService.createProduct(req.body);
    return ApiResponse(res, {
        statusCode: 201,
        message: "Tạo sản phẩm thành công",
        data: product,
    });
};

const updateProduct = async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Cập nhật sản phẩm thành công",
        data: product,
    });
};

export { createProduct, updateProduct };
