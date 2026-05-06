import attributeRepository from "./attribute.repository.js";
import { NotFoundError, ConflictError, BadRequestError } from "../../../utils/app-error.js";

const getAllAttributes = async () => {
    return attributeRepository.getAll();
};

const getAttributeById = async (id) => {
    const attribute = await attributeRepository.getById(id);
    if (!attribute) {
        throw new NotFoundError("Không tìm thấy thuộc tính");
    }
    return attribute;
};

const createAttribute = async (data) => {
    if (!data.name) {
        throw new BadRequestError("Tên thuộc tính không được để trống");
    }
    
    const existing = await attributeRepository.findByName(data.name);
    if (existing) {
        throw new ConflictError("Tên thuộc tính đã tồn tại");
    }
    return attributeRepository.create(data);
};

const updateAttribute = async (id, data) => {
    const attribute = await attributeRepository.getById(id);
    if (!attribute) {
        throw new NotFoundError("Không tìm thấy thuộc tính");
    }

    if (data.name) {
        const existing = await attributeRepository.findByName(data.name);
        if (existing && existing.id !== parseInt(id)) {
            throw new ConflictError("Tên thuộc tính đã tồn tại");
        }
    }

    return attributeRepository.update(id, data);
};

const deleteAttribute = async (id) => {
    const attribute = await attributeRepository.getById(id);
    if (!attribute) {
        throw new NotFoundError("Không tìm thấy thuộc tính");
    }

    // Kiểm tra xem có sản phẩm nào đang sử dụng attribute này không
    if (attribute.options && attribute.options.length > 0) {
        throw new BadRequestError("Không thể xóa thuộc tính đang được sử dụng bởi sản phẩm");
    }

    return attributeRepository.delete(id);
};

export {
    getAllAttributes,
    getAttributeById,
    createAttribute,
    updateAttribute,
    deleteAttribute
};
