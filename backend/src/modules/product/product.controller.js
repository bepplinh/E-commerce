import ApiResponse from "../../helpers/response.helper.js";
import * as productService from "./product.service.js";

const getFilter = async (req, res) => {
    const data = await productService.getFilterData();
    return ApiResponse(res, {
        statusCode: 200,
        data,
    });
};

const getProduct = async (req, res) => {
    const data = await productService.getProductList(req.query);
    return ApiResponse(res, {
        statusCode: 200,
        data,
    });
};

const getProductDetail = async (req, res) => {
    const { slug } = req.params;
    const product = await productService.getProductDetail(slug);
    return ApiResponse(res, {
        statusCode: 200,
        data: product,
    });
};

export { getFilter, getProduct, getProductDetail };
