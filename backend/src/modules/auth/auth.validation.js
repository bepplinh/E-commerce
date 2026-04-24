import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  fullName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

export { registerSchema, loginSchema };
