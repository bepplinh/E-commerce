import ApiResponse from "../../helpers/response.helper.js";
import * as wishlistService from "./wishlist.service.js";

const getWishlist = async (req, res) => {
    const userId = req.user.id;
    const wishlist = await wishlistService.getWishlist(userId);

    return ApiResponse(res, {
        statusCode: 200,
        message: "Lấy wishlist thành công",
        data: wishlist,
    });
};

const addProductToWishlist = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    const wishlist = await wishlistService.addProductToWishlist({ userId, productId });

    return ApiResponse(res, {
        statusCode: 201,
        message: "Thêm sản phẩm vào wishlist thành công",
        data: wishlist,
    });
};

const removeProductFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    const wishlist = await wishlistService.removeProductFromWishlist({ userId, productId });

    return ApiResponse(res, {
        statusCode: 200,
        message: "Xóa sản phẩm khỏi wishlist thành công",
        data: wishlist,
    });
};

const clearWishlist = async (req, res) => {
    const userId = req.user.id;
    const wishlist = await wishlistService.clearWishlist(userId);

    return ApiResponse(res, {
        statusCode: 200,
        message: "Xóa toàn bộ wishlist thành công",
        data: wishlist,
    });
};

export { getWishlist, addProductToWishlist, removeProductFromWishlist, clearWishlist };
