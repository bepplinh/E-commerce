import slugify from "slugify";
import { BadRequestError, ConflictError, NotFoundError } from "../../../utils/app-error.js";
import categoryRepository from "./category.repository.js";

const normalizeSlug = (value) =>
    slugify(value, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        locale: "vi",
    });

const validateCategoryId = (id) => {
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
        throw new BadRequestError("ID category không hợp lệ");
    }
    return categoryId;
};

const generateUniqueSlug = async (name) => {
    const baseSlug = normalizeSlug(name);
    let slug = baseSlug;
    let counter = 1;
    let existingCategory = await categoryRepository.findBySlug(slug);

    while (existingCategory) {
        slug = `${baseSlug}-${counter}`;
        existingCategory = await categoryRepository.findBySlug(slug);
        counter += 1;
    }

    return slug;
};

const getAllCategories = async () => {
    return categoryRepository.getAll();
};

const getCategoryById = async (id) => {
    const categoryId = validateCategoryId(id);
    const category = await categoryRepository.getById(categoryId);

    if (!category) {
        throw new NotFoundError("Không tìm thấy category");
    }

    return category;
};

const createCategory = async (data) => {
    if (!data.name) {
        throw new BadRequestError("Tên category không được để trống");
    }

    if (data.parentId) {
        const parent = await categoryRepository.getById(data.parentId);
        if (!parent) {
            throw new NotFoundError("Không tìm thấy category cha");
        }
    }

    const existingName = await categoryRepository.findByName(data.name);
    if (existingName) {
        throw new ConflictError("Tên category đã tồn tại");
    }

    const slug = data.slug ? normalizeSlug(data.slug) : await generateUniqueSlug(data.name);
    const existingSlug = await categoryRepository.findBySlug(slug);
    if (existingSlug) {
        throw new ConflictError("Slug category đã tồn tại");
    }

    return categoryRepository.create({
        name: data.name,
        slug,
        parentId: data.parentId ?? null,
        imageUrl: data.imageUrl ?? null,
        description: data.description ?? null,
    });
};

const updateCategory = async (id, data) => {
    const categoryId = validateCategoryId(id);
    const category = await categoryRepository.getById(categoryId);

    if (!category) {
        throw new NotFoundError("Không tìm thấy category");
    }

    if (data.parentId !== undefined && data.parentId !== null) {
        if (data.parentId === categoryId) {
            throw new BadRequestError("Category không thể là cha của chính nó");
        }

        const parent = await categoryRepository.getById(data.parentId);
        if (!parent) {
            throw new NotFoundError("Không tìm thấy category cha");
        }
    }

    if (data.name) {
        const existingName = await categoryRepository.findByName(data.name);
        if (existingName && existingName.id !== categoryId) {
            throw new ConflictError("Tên category đã tồn tại");
        }
    }

    const nextName = data.name ?? category.name;
    const nextSlug = data.slug ? normalizeSlug(data.slug) : data.name && data.name !== category.name ? await generateUniqueSlug(data.name) : category.slug;

    if (nextSlug !== category.slug) {
        const existingSlug = await categoryRepository.findBySlug(nextSlug);
        if (existingSlug && existingSlug.id !== categoryId) {
            throw new ConflictError("Slug category đã tồn tại");
        }
    }

    return categoryRepository.update(categoryId, {
        name: nextName,
        slug: nextSlug,
        parentId: data.parentId === undefined ? category.parentId : data.parentId,
        imageUrl: data.imageUrl === undefined ? category.imageUrl : data.imageUrl,
        description: data.description === undefined ? category.description : data.description,
    });
};

const deleteCategory = async (id) => {
    const categoryId = validateCategoryId(id);
    const category = await categoryRepository.getById(categoryId);

    if (!category) {
        throw new NotFoundError("Không tìm thấy category");
    }

    if (category._count?.children > 0) {
        throw new BadRequestError("Không thể xóa category đang có danh mục con");
    }

    if (category._count?.products > 0) {
        throw new BadRequestError("Không thể xóa category đang được sử dụng bởi sản phẩm");
    }

    return categoryRepository.delete(categoryId);
};

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
