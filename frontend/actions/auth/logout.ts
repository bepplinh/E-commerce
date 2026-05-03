"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL;

export async function handleLogout() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (refreshToken) {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken }),
            });
        } catch (error) {
            console.error("Logout backend failed", error);
        }
    }

    // Xóa cookies trình duyệt
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    // Revalidate để cập nhật layout/header
    revalidatePath("/");

    return { success: true };
}
