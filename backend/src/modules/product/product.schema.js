import { z } from "zod";

// ── Option ────────────────────────────────────────────────────────────────────
const optionSchema = z.object({
    name: z.string({ required_error: "Tên option là bắt buộc" }).min(1, "Tên option không được rỗng").max(50),
    values: z
        .array(
            z.object({
                value: z.string().min(1, "Giá trị option không được rỗng").max(100),
                // metadata tuỳ chọn — ví dụ: { "hexCode": "#000000" } cho Color
                metadata: z.record(z.string(), z.string()).optional().nullable(),
            })
        )
        .min(1, "Mỗi option phải có ít nhất 1 giá trị"),
});

// ── Image ─────────────────────────────────────────────────────────────────────
const createImageSchema = z.object({
    url: z.string().url("URL ảnh không hợp lệ"),
    isPrimary: z.boolean().default(false),
    sortOrder: z.number().int().nonnegative().optional(),
});

const updateImageSchema = z.object({
    id: z.number().int().positive("ID ảnh không hợp lệ").optional(),
    url: z.string().url("URL ảnh không hợp lệ").optional(),
    isPrimary: z.boolean().optional(),
    sortOrder: z.number().int().nonnegative().optional(),
});

// ── Variant ───────────────────────────────────────────────────────────────────
const createVariantSchema = z.object({
    sku: z.string({ required_error: "SKU là bắt buộc" }).min(1, "SKU không được rỗng").max(100),
    price: z.number({ required_error: "Giá variant là bắt buộc" }).positive("Giá phải lớn hơn 0"),
    stockQuantity: z.number().int().min(0, "Số lượng không được âm").default(0),
    attributes: z.record(z.string(), z.string()).optional().default({}),
    images: z.array(createImageSchema).optional().default([]), // Ảnh riêng cho variant
});

const updateVariantSchema = z.object({
    id: z.number().int().positive("ID variant không hợp lệ").optional(),
    sku: z.string().min(1, "SKU không được rỗng").max(100).optional(),
    price: z.number().positive("Giá phải lớn hơn 0").optional(),
    stockQuantity: z.number().int().min(0, "Số lượng không được âm").optional(),
    attributes: z.record(z.string(), z.string()).optional(),
    images: z.array(updateImageSchema).optional(),
});

// ── Product payload ───────────────────────────────────────────────────────────
export const createProductSchema = z.object({
    categoryId: z.number({ 
        required_error: "categoryId là bắt buộc",
        invalid_type_error: "categoryId phải là số" 
    }).int().positive("categoryId không hợp lệ"),
    
    brandId: z.number().int().positive("brandId không hợp lệ").optional().nullable(),
    
    name: z.string({ 
        required_error: "Tên sản phẩm là bắt buộc" 
    }).min(1, "Tên sản phẩm không được rỗng").max(255),
    
    slug: z.string().min(1).max(255).optional(),
    description: z.string().optional().nullable(),
    
    basePrice: z.number({ 
        required_error: "Giá gốc là bắt buộc" 
    }).positive("Giá cơ bản phải lớn hơn 0"),
    
    isActive: z.boolean().default(true),
    
    // Đổi từ imageUrls (string[]) sang images (object[])
    images: z.array(createImageSchema).optional().default([]),
    
    options: z.array(optionSchema).optional().default([]),
    
    variants: z.array(createVariantSchema, { 
        required_error: "Danh sách biến thể là bắt buộc" 
    }).min(1, "Sản phẩm phải có ít nhất 1 variant"),
});

export const updateProductSchema = z.object({
    categoryId: z.number().int().positive("categoryId không hợp lệ").optional(),
    brandId: z.number().int().positive("brandId không hợp lệ").optional().nullable(),
    name: z.string().min(1, "Tên sản phẩm không được rỗng").max(255).optional(),
    slug: z.string().min(1).max(255).optional(),
    description: z.string().optional().nullable(),
    basePrice: z.number().positive("Giá cơ bản phải lớn hơn 0").optional(),
    isActive: z.boolean().optional(),
    images: z.array(updateImageSchema).optional(),
    options: z.array(optionSchema).optional(),
    variants: z.array(updateVariantSchema).optional(),
});
