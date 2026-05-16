import UserService from "./user.service.js";
import ApiResponse from "../../helpers/response.helper.js";

const UserController = {
    getProfile: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await UserService.getProfile(userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Profile fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    updateProfile: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await UserService.updateProfile(userId, req.body);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Profile updated successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;
            await UserService.changePassword(userId, currentPassword, newPassword);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Password changed successfully",
            });
        } catch (error) {
            next(error);
        }
    },
};

export default UserController;
