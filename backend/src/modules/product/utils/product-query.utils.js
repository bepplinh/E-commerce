import { BadRequestError } from "../../../utils/app-error.js";

const parseOptionalNumber = (value, fieldName) => {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new BadRequestError(`${fieldName} không hợp lệ`);
    }

    return parsed;
};

const parsePositiveInteger = (value, fieldName, fallback, max) => {
    const parsed = parseOptionalNumber(value, fieldName);
    if (parsed === undefined) {
        return fallback;
    }

    if (!Number.isInteger(parsed) || parsed <= 0) {
        throw new BadRequestError(`${fieldName} phải là số nguyên dương`);
    }

    if (max !== undefined && parsed > max) {
        return max;
    }

    return parsed;
};

export const parseProductListQuery = (query = {}) => {
    const {
        category,
        color,
        brand,
        size,
        minPrice,
        maxPrice,
        page,
        limit,
    } = query;

    return {
        category,
        color,
        brand,
        size,
        minPrice: parseOptionalNumber(minPrice, "minPrice"),
        maxPrice: parseOptionalNumber(maxPrice, "maxPrice"),
        page: parsePositiveInteger(page, "page", 1),
        limit: parsePositiveInteger(limit, "limit", 10, 50),
    };
};
