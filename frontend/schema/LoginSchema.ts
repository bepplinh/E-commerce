import { z } from "zod";

const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" })
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export default LoginSchema;
