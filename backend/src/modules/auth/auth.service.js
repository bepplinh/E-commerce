import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import authRepository from "./auth.repository.js";
import { ConflictError, UnauthorizedError } from "../../utils/app-error.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000; // 7 ngày

// ── Helpers ──
const signAccessToken = (user) => {
    // Lấy role đầu tiên của user (ví dụ: "admin" hoặc "user")
    const role = user.userRoles?.[0]?.role?.name || "user";
    
    return jwt.sign({ id: user.id, email: user.email, role }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
    });
};

const generateRefreshToken = () => crypto.randomBytes(64).toString("hex");

const pickPublicUser = (user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl ?? null,
    role: user.userRoles?.[0]?.role?.name || "user",
});

// ── Services ──
const register = async (userData) => {
    const { username, email, password, phone } = userData;

    const existingUser = await authRepository.findUserByEmailOrUsername(email, username);
    if (existingUser) {
        throw new ConflictError("User with email or username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepository.createUser({
        username,
        email,
        password: hashedPassword,
        phone,
    });

    const accessToken = signAccessToken(newUser);
    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS);

    await authRepository.createRefreshToken(newUser.id, refreshToken, expiresAt);

    return {
        accessToken,
        refreshToken,
        user: pickPublicUser(newUser),
    };
};

const login = async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedError("Invalid credentials");

    const accessToken = signAccessToken(user);
    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS);

    await authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    return {
        accessToken,
        refreshToken,
        user: pickPublicUser(user),
    };
};

const refresh = async (token) => {
    if (!token) throw new UnauthorizedError("Refresh token required");

    const stored = await authRepository.findRefreshToken(token);
    if (!stored || stored.expiresAt < new Date()) {
        // Token không tồn tại hoặc đã hết hạn — xóa nếu còn trong DB
        if (stored) await authRepository.deleteRefreshToken(token);
        throw new UnauthorizedError("Invalid or expired refresh token");
    }

    // Rotate: xóa token cũ, tạo token mới
    await authRepository.deleteRefreshToken(token);
    const newRefreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_MS);
    await authRepository.createRefreshToken(stored.userId, newRefreshToken, expiresAt);

    const newAccessToken = signAccessToken(stored.user);

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: pickPublicUser(stored.user),
    };
};

const logout = async (refreshToken) => {
    if (!refreshToken) return;
    try {
        await authRepository.deleteRefreshToken(refreshToken);
    } catch {
        // Token không tồn tại — không cần throw
    }
};

const getUserInfo = async (id) => {
    const user = await authRepository.getUserById(id);
    if (!user) throw new UnauthorizedError("User not found");
    return pickPublicUser(user);
};

export { register, login, refresh, logout, getUserInfo, signAccessToken, generateRefreshToken, REFRESH_TOKEN_EXPIRES_MS };
