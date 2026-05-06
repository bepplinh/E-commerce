import ApiResponse from "../../helpers/response.helper.js";
import * as authService from "./auth.service.js";

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    path: "/",
};

const register = async (req, res) => {
    const { accessToken, refreshToken, user } = await authService.register(req.body);

    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

    return ApiResponse(res, {
        statusCode: 201,
        message: "User registered successfully",
        data: {
            token: accessToken,
            refreshToken: refreshToken,
            user,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(email, password);

    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

    return ApiResponse(res, {
        statusCode: 200,
        message: "Login successful",
        data: {
            token: accessToken,
            refreshToken: refreshToken,
            user,
        },
    });
};

const refresh = async (req, res) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    const { accessToken, refreshToken, user } = await authService.refresh(token);

    res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);

    return ApiResponse(res, {
        statusCode: 200,
        data: {
            token: accessToken,
            refreshToken: refreshToken,
            user,
        },
    });
};

const logout = async (req, res) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    await authService.logout(token);

    res.clearCookie("refreshToken", { path: "/" });
    res.clearCookie("accessToken", { path: "/" });

    return ApiResponse(res, {
        statusCode: 200,
        message: "Logout successful",
    });
};

const getMe = async (req, res) => {
    const user = await authService.getUserInfo(req.user.id);
    return ApiResponse(res, {
        statusCode: 200,
        data: user,
    });
};

export { register, login, refresh, logout, getMe };

