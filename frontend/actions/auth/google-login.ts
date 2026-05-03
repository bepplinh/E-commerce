"use server";

import { AuthActionResult } from "@/types/auth";
import { setAuthCookies } from "@/libs/auth";

const API_URL = process.env.API_URL;

export async function handleGoogleLogin(accessToken: string): Promise<AuthActionResult> {
    try {
        const res = await fetch(`${API_URL}/auth/login/google`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            return { success: false, error: data.message || "Login failed" };
        }

        await setAuthCookies(data.data.token, data.data.refreshToken);


        return {
            success: true,
            message: data.message,
            user: data.data.user,
        };
    } catch {
        return { success: false, error: "Something went wrong!" };
    }
}
