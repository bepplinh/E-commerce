"use server";

import RegisterSchema from '@/schema/RegisterSchema';
import { AuthActionResult } from '@/types/auth';
import { setAuthCookies } from "@/libs/auth";
import { z } from "zod";

const API_URL = process.env.API_URL;

export async function handleRegister(data: z.infer<typeof RegisterSchema>): Promise<AuthActionResult> {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        
        if (!res.ok || !result.success) {
            return { success: false, error: result.message || "Registration failed" };
        }

        await setAuthCookies(result.data.token, result.data.refreshToken);

        return {
            success: true,
            message: result.message,
            user: result.data.user,
        };
        
    } catch (error) {
        return { success: false, error: "Something went wrong during registration!" };
    }
}

