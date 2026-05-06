import prisma from "../../config/prisma.js";

const findUserByEmailOrUsername = async (email, username, client = prisma) => {
    return client.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
        include: {
            userRoles: {
                include: {
                    role: true,
                },
            },
        },
    });
};

const findUserByEmail = async (email, client = prisma) => {
    return client.user.findUnique({
        where: { email },
        include: {
            userRoles: {
                include: {
                    role: true,
                },
            },
        },
    });
};

const createUser = async (data, client = prisma) => {
    return client.user.create({
        data,
    });
};

const getUserById = async (userId, client = prisma) => {
    return client.user.findUnique({
        where: { id: userId },
        include: {
            userRoles: {
                include: {
                    role: true,
                },
            },
        },
    });
};

// ── Refresh Token ──
const createRefreshToken = async (userId, token, expiresAt, client = prisma) => {
    return client.refreshToken.create({
        data: { userId, token, expiresAt },
    });
};

const findRefreshToken = async (token, client = prisma) => {
    return client.refreshToken.findUnique({
        where: { token },
        include: { user: true },
    });
};

const deleteRefreshToken = async (token, client = prisma) => {
    return client.refreshToken.delete({
        where: { token },
    });
};

const deleteAllRefreshTokensByUser = async (userId, client = prisma) => {
    return client.refreshToken.deleteMany({
        where: { userId },
    });
};

export default {
    findUserByEmailOrUsername,
    findUserByEmail,
    createUser,
    getUserById,
    createRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
    deleteAllRefreshTokensByUser,
};

