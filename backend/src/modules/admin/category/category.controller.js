import ApiResponse from "../../../helpers/response.helper.js";
import * as categoryService from "./category.service.js";

const getCategories = async (req, res) => {
    const categories = await categoryService.getAllCategories();
    return ApiResponse(res, {
        statusCode: 200,
        data: categories,
    });
};

const getCategoryDetail = async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);
    return ApiResponse(res, {
        statusCode: 200,
        data: category,
    });
};

const createCategory = async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    return ApiResponse(res, {
        statusCode: 201,
        message: "Tạo category thành công",
        data: category,
    });
};

const updateCategory = async (req, res) => {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Cập nhật category thành công",
        data: category,
    });
};

const deleteCategory = async (req, res) => {
    await categoryService.deleteCategory(req.params.id);
    return ApiResponse(res, {
        statusCode: 200,
        message: "Xóa category thành công",
    });
};

export { getCategories, getCategoryDetail, createCategory, updateCategory, deleteCategory };
