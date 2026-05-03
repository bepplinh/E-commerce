import User from "./user";

// Return type cho Server Actions liên quan đến auth
export type AuthActionResult =
    | { success: true; message: string; user: User }
    | { success: false; error: string };

// Dữ liệu session từ server (dùng trong layout, route handler)
export type AuthSession = {
    user: User | null;
    isAuth: boolean;
};
