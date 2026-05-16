import prisma from "../../config/prisma.js";

class UserRepository {
    async getById(id) {
        return await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                fullName: true,
                avatarUrl: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async update(id, data) {
        return await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                fullName: true,
                avatarUrl: true,
                status: true,
            },
        });
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }

    async getPassword(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { password: true },
        });
        return user?.password;
    }

    async updatePassword(id, hashedPassword) {
        return await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }
}

export default new UserRepository();
