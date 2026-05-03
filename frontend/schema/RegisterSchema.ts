import { z } from "zod";

const RegisterSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default RegisterSchema;
