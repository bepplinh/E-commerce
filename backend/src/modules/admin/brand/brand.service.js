import slugify from "slugify";
import { BadRequestError, ConflictError, NotFoundError } from "../../../utils/app-error.js";
import brandRepository from "./brand.repository.js";

const normalizeSlug = (value) =>
    slugify(value, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        locale: "vi",
    });

const validateBrandId = (id) => {
    const brandId = Number(id);
    if (!Number.isInteger(brandId) || brandId <= 0) {
        throw new BadRequestError("ID brand không hợp lệ");
    }
    return brandId;
};

const generateUniqueSlug = async (name) => {
    const baseSlug = normalizeSlug(name);
    let slug = baseSlug;
    let counter = 1;
    let existingBrand = await brandRepository.findBySlug(slug);

    while (existingBrand) {
        slug = `${baseSlug}-${counter}`;
        existingBrand = await brandRepository.findBySlug(slug);
        counter += 1;
    }

    return slug;
};

const getAllBrands = async () => {
    return brandRepository.getAll();
};

const getBrandById = async (id) => {
    const brandId = validateBrandId(id);
    const brand = await brandRepository.getById(brandId);

    if (!brand) {
        throw new NotFoundError("Không tìm thấy brand");
    }

    return brand;
};

const createBrand = async (data) => {
    if (!data.name) {
        throw new BadRequestError("Tên brand không được để trống");
    }

    const existingName = await brandRepository.findByName(data.name);
    if (existingName) {
        throw new ConflictError("Tên brand đã tồn tại");
    }

    const slug = data.slug ? normalizeSlug(data.slug) : await generateUniqueSlug(data.name);
    const existingSlug = await brandRepository.findBySlug(slug);
    if (existingSlug) {
        throw new ConflictError("Slug brand đã tồn tại");
    }

    return brandRepository.create({
        name: data.name,
        slug,
        logoUrl: data.logoUrl ?? null,
    });
};

const updateBrand = async (id, data) => {
    const brandId = validateBrandId(id);
    const brand = await brandRepository.getById(brandId);

    if (!brand) {
        throw new NotFoundError("Không tìm thấy brand");
    }

    const nextName = data.name ?? brand.name;
    const nextSlug = data.slug ? normalizeSlug(data.slug) : data.name && data.name !== brand.name ? await generateUniqueSlug(data.name) : brand.slug;

    if (data.name) {
        const existingName = await brandRepository.findByName(data.name);
        if (existingName && existingName.id !== brandId) {
            throw new ConflictError("Tên brand đã tồn tại");
        }
    }

    if (nextSlug !== brand.slug) {
        const existingSlug = await brandRepository.findBySlug(nextSlug);
        if (existingSlug && existingSlug.id !== brandId) {
            throw new ConflictError("Slug brand đã tồn tại");
        }
    }

    return brandRepository.update(brandId, {
        name: nextName,
        slug: nextSlug,
        logoUrl: data.logoUrl === undefined ? brand.logoUrl : data.logoUrl,
    });
};

const deleteBrand = async (id) => {
    const brandId = validateBrandId(id);
    const brand = await brandRepository.getById(brandId);

    if (!brand) {
        throw new NotFoundError("Không tìm thấy brand");
    }

    if (brand._count?.products > 0) {
        throw new BadRequestError("Không thể xóa brand đang được sử dụng bởi sản phẩm");
    }

    return brandRepository.delete(brandId);
};

export { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand };
