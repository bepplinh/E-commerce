import prisma from "../../config/prisma.js";

class ReviewRepository {
    async create(data, images) {
        return await prisma.$transaction(async (tx) => {
            const review = await tx.review.create({
                data: {
                    userId: data.userId,
                    productId: data.productId,
                    orderItemId: data.orderItemId,
                    rating: data.rating,
                    comment: data.comment,
                },
            });

            if (images && images.length > 0) {
                await tx.reviewImage.createMany({
                    data: images.map((url) => ({
                        reviewId: review.id,
                        imageUrl: url,
                    })),
                });
            }

            return await tx.review.findUnique({
                where: { id: review.id },
                include: { images: true },
            });
        });
    }

    async getByProductId(productId, skip, take) {
        const [total, items] = await Promise.all([
            prisma.review.count({ where: { productId } }),
            prisma.review.findMany({
                where: { productId },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            fullName: true,
                            avatarUrl: true,
                        },
                    },
                    images: true,
                },
                orderBy: { createdAt: "desc" },
                skip,
                take,
            }),
        ]);

        return { total, items };
    }

    async getById(id) {
        return await prisma.review.findUnique({
            where: { id },
            include: { images: true },
        });
    }

    async update(id, userId, data, images) {
        return await prisma.$transaction(async (tx) => {
            const review = await tx.review.update({
                where: { id, userId },
                data: {
                    rating: data.rating,
                    comment: data.comment,
                },
            });

            if (images) {
                // Simplistic approach: delete old images and add new ones
                await tx.reviewImage.deleteMany({ where: { reviewId: id } });
                if (images.length > 0) {
                    await tx.reviewImage.createMany({
                        data: images.map((url) => ({
                            reviewId: review.id,
                            imageUrl: url,
                        })),
                    });
                }
            }

            return await tx.review.findUnique({
                where: { id },
                include: { images: true },
            });
        });
    }

    async delete(id, userId, isAdmin = false) {
        const where = isAdmin ? { id } : { id, userId };
        return await prisma.review.delete({
            where,
        });
    }

    async checkExistingReview(userId, orderItemId) {
        return await prisma.review.findFirst({
            where: { userId, orderItemId },
        });
    }
}

export default new ReviewRepository();
