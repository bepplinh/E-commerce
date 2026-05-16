import prisma from "../../config/prisma.js";

class AddressRepository {
    async getAllByUserId(userId) {
        return await prisma.address.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }

    async getById(id, userId) {
        return await prisma.address.findFirst({
            where: { id, userId },
        });
    }

    async create(data) {
        return await prisma.address.create({
            data,
        });
    }

    async update(id, userId, data) {
        return await prisma.address.update({
            where: { id, userId },
            data,
        });
    }

    async delete(id, userId) {
        return await prisma.address.delete({
            where: { id, userId },
        });
    }

    async resetDefault(userId) {
        return await prisma.address.updateMany({
            where: { userId, isDefault: true },
            data: { isDefault: false },
        });
    }

    async setDefault(id, userId) {
        await this.resetDefault(userId);
        return await prisma.address.update({
            where: { id, userId },
            data: { isDefault: true },
        });
    }
}

export default new AddressRepository();
