import prisma from "../../../config/prisma.js";

class BrandRepository {
    getAll() {
        return prisma.brand.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
            orderBy: { name: "asc" },
        });
    }

    getById(id) {
        return prisma.brand.findUnique({
            where: { id: parseInt(id) },
            include: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        isActive: true,
                    },
                },
                _count: {
                    select: { products: true },
                },
            },
        });
    }

    findByName(name) {
        return prisma.brand.findUnique({
            where: { name },
        });
    }

    findBySlug(slug) {
        return prisma.brand.findUnique({
            where: { slug },
        });
    }

    create(data) {
        return prisma.brand.create({
            data,
        });
    }

    update(id, data) {
        return prisma.brand.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    delete(id) {
        return prisma.brand.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new BrandRepository();
