import ReviewRepository from "./review.repository.js";

class ReviewService {
    async createReview(userId, data) {
        if (data.orderItemId) {
            const existing = await ReviewRepository.checkExistingReview(userId, data.orderItemId);
            if (existing) {
                throw new Error("You have already reviewed this item");
            }
        }
        
        const { images, ...reviewData } = data;
        return await ReviewRepository.create({ ...reviewData, userId }, images);
    }

    async getProductReviews(productId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const { total, items } = await ReviewRepository.getByProductId(Number(productId), skip, limit);
        
        return {
            items,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async updateReview(id, userId, data) {
        const review = await ReviewRepository.getById(id);
        if (!review) {
            throw new Error("Review not found");
        }
        if (review.userId !== userId) {
            throw new Error("You can only update your own reviews");
        }

        const { images, ...reviewData } = data;
        return await ReviewRepository.update(id, userId, reviewData, images);
    }

    async deleteReview(id, userId, isAdmin = false) {
        const review = await ReviewRepository.getById(id);
        if (!review) {
            throw new Error("Review not found");
        }
        if (!isAdmin && review.userId !== userId) {
            throw new Error("You can only delete your own reviews");
        }

        return await ReviewRepository.delete(id, userId, isAdmin);
    }
}

export default new ReviewService();
