import ReviewService from "./review.service.js";
import ApiResponse from "../../helpers/response.helper.js";

const ReviewController = {
    createReview: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await ReviewService.createReview(userId, req.body);
            return ApiResponse(res, {
                statusCode: 201,
                message: "Review submitted successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    getProductReviews: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const { page, limit } = req.query;
            const data = await ReviewService.getProductReviews(productId, page, limit);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Reviews fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    updateReview: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const data = await ReviewService.updateReview(Number(id), userId, req.body);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Review updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const isAdmin = req.user.role === "ADMIN"; // Simplified role check
            await ReviewService.deleteReview(Number(id), userId, isAdmin);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Review deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    },
};

export default ReviewController;
