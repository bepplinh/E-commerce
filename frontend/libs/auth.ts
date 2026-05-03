import { cache } from "react";
import { cookies } from "next/headers";
import { AuthSession } from "@/types/auth";

const API_URL = process.env.API_URL;

export const getAuthUser = cache(async (): Promise<AuthSession> => {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!token && !refreshToken) {
        return { user: null, isAuth: false };
    }

    try {
        // 1. Thử lấy thông tin user với accessToken hiện tại
        let res = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });

        // 2. Nếu accessToken hết hạn (401) nhưng có refreshToken, thử làm mới
        if (res.status === 401 && refreshToken) {
            const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
                cache: "no-store",
            });

            if (refreshRes.ok) {
                const refreshData = await refreshRes.json();
                const newToken = refreshData.data.token;
                const newRefreshToken = refreshData.data.refreshToken;

                await setAuthCookies(newToken, newRefreshToken);


                res = await fetch(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${newToken}` },
                    cache: "no-store",
                });
            }
        }

        if (!res.ok) {
            return { user: null, isAuth: false };
        }

        const { data } = await res.json();
        return { user: data, isAuth: true };
    } catch (error) {
        return { user: null, isAuth: false };
    }
});


export const setAuthCookies = async (token: string, refreshToken: string) => {
    const cookieStore = await cookies();
    
    cookieStore.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60,
    });
    
    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
    });
};
