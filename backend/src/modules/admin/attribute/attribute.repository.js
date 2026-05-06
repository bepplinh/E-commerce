import prisma from "../../../config/prisma.js";

class AttributeRepository {
    getAll() {
        return prisma.attribute.findMany({
            include: {
                _count: {
                    select: { options: true }
                }
            },
            orderBy: { name: "asc" },
        });
    }

    getById(id) {
        return prisma.attribute.findUnique({
            where: { id: parseInt(id) },
            include: {
                options: {
                    include: {
                        product: {
                            select: { name: true, slug: true }
                        }
                    }
                }
            }
        });
    }

    create(data) {
        return prisma.attribute.create({
            data: {
                name: data.name
            }
        });
    }

    update(id, data) {
        return prisma.attribute.update({
            where: { id: parseInt(id) },
            data: {
                name: data.name
            }
        });
    }

    delete(id) {
        return prisma.attribute.delete({
            where: { id: parseInt(id) }
        });
    }

    findByName(name) {
        return prisma.attribute.findUnique({
            where: { name }
        });
    }
}

export default new AttributeRepository();
