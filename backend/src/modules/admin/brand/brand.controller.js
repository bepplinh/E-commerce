import ApiResponse from "../../../helpers/response.helper.js";
import * as brandService from "./brand.service.js";

const getBrands = async (req, res) => {
    const brands = await brandService.getAllBrands();
    return ApiResponse(res, {
        statusCode: 200,
        data: brands,
    });
};

const getBrandDetail = async (req, res) => {
    const brand = await brandService.getBrandById(req.params.id);
    return ApiResponse(res, {
        statusCode: 200,
        data: brand,
    });
};

const createBrand = async (req, res) => {
    const brand = await brandService.createBrand(req.body);
    return ApiResponse(res, {
        statusCode: 201,
        message: "Tạo brand thành công",
        data: brand,
    });
};

const updateBrand = async (req, res) => {
    const brand = await brandService.updateBrand(req.params.id, req.body);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Cập nhật brand thành công",
        data: brand,
    });
};

const deleteBrand = async (req, res) => {
    await brandService.deleteBrand(req.params.id);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Xóa brand thành công",
    });
};

export { getBrands, getBrandDetail, createBrand, updateBrand, deleteBrand };
