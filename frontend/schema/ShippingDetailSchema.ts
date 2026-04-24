import { z } from "zod";

const ShippingDetailSchema = z.object({
    fullName: z.string().min(1, "Fullname is required"),
    phone: z.string().min(1, "Phone number is required"),
    pincode: z.string().min(1, "Pincode is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "Town / City is required"),
    houseInfo: z.string().min(1, "House no, Building Name is required"),
    roadInfo: z.string().min(1, "Road Name, Area, Colony is required"),
    landmark: z.string().optional(),
});

export default ShippingDetailSchema;
