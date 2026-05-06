import ApiResponse from "../../../helpers/response.helper.js";
import * as attributeService from "./attribute.service.js";

const getAttributes = async (req, res) => {
    const attributes = await attributeService.getAllAttributes();
    return ApiResponse(res, { statusCode: 200, data: attributes });
};

const getAttributeDetail = async (req, res) => {
    const attribute = await attributeService.getAttributeById(req.params.id);
    return ApiResponse(res, { statusCode: 200, data: attribute });
};

const createAttribute = async (req, res) => {
    const attribute = await attributeService.createAttribute(req.body);
    return ApiResponse(res, { statusCode: 201, message: "Tạo thuộc tính thành công", data: attribute });
};

const updateAttribute = async (req, res) => {
    const attribute = await attributeService.updateAttribute(req.params.id, req.body);
    return ApiResponse(res, { statusCode: 200, message: "Cập nhật thành công", data: attribute });
};

const deleteAttribute = async (req, res) => {
    await attributeService.deleteAttribute(req.params.id);
    return ApiResponse(res, { statusCode: 200, message: "Xóa thuộc tính thành công" });
};

export { getAttributes, getAttributeDetail, createAttribute, updateAttribute, deleteAttribute };
