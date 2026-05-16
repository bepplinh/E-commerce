import { z } from "zod";

export const createAddressSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    province: z.string().min(1, "Province is required"),
    district: z.string().min(1, "District is required"),
    ward: z.string().min(1, "Ward is required"),
    addressLine: z.string().min(1, "Address line is required"),
    isDefault: z.boolean().optional().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();
