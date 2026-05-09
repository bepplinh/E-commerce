import prisma from "../../../config/prisma.js";

class CategoryRepository {
    getAll() {
        return prisma.category.findMany({
            include: {
                parent: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                children: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                _count: {
                    select: {
                        products: true,
                        children: true,
                    },
                },
            },
            orderBy: [{ parentId: "asc" }, { name: "asc" }],
        });
    }

    getById(id) {
        return prisma.category.findUnique({
            where: { id: parseInt(id) },
            include: {
                parent: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                children: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                products: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        isActive: true,
                    },
                },
                _count: {
                    select: {
                        products: true,
                        children: true,
                    },
                },
            },
        });
    }

    findByName(name) {
        return prisma.category.findUnique({
            where: { name },
        });
    }

    findBySlug(slug) {
        return prisma.category.findUnique({
            where: { slug },
        });
    }

    create(data) {
        return prisma.category.create({
            data,
        });
    }

    update(id, data) {
        return prisma.category.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    delete(id) {
        return prisma.category.delete({
            where: { id: parseInt(id) },
        });
    }
}

export default new CategoryRepository();
