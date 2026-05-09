import { BadRequestError, ConflictError, NotFoundError } from "../../utils/app-error.js";
import productRepository from "../product/product.repository.js";
import * as wishlistRepository from "./wishlist.repository.js";

const validateProductId = (productId) => {
    const id = Number(productId);

    if (!Number.isInteger(id) || id <= 0) {
        throw new BadRequestError("ID sản phẩm không hợp lệ");
    }

    return id;
};

const getWishlist = async (userId) => {
    await wishlistRepository.ensureWishlist(userId);
    return wishlistRepository.getWishlistByUserId(userId);
};

const addProductToWishlist = async ({ userId, productId }) => {
    const id = validateProductId(productId);
    const product = await productRepository.getProductById(id);

    if (!product) {
        throw new NotFoundError("Không tìm thấy sản phẩm");
    }

    const wishlist = await wishlistRepository.ensureWishlist(userId);
    const existingItem = await wishlistRepository.findWishlistItem(wishlist.id, id);

    if (existingItem) {
        throw new ConflictError("Sản phẩm đã tồn tại trong wishlist");
    }

    await wishlistRepository.createWishlistItem({
        wishlistId: wishlist.id,
        productId: id,
    });

    return wishlistRepository.getWishlistByUserId(userId);
};

const removeProductFromWishlist = async ({ userId, productId }) => {
    const id = validateProductId(productId);
    const wishlist = await wishlistRepository.ensureWishlist(userId);
    const existingItem = await wishlistRepository.findWishlistItem(wishlist.id, id);

    if (!existingItem) {
        throw new NotFoundError("Sản phẩm không có trong wishlist");
    }

    await wishlistRepository.deleteWishlistItem({
        wishlistId: wishlist.id,
        productId: id,
    });

    return wishlistRepository.getWishlistByUserId(userId);
};

const clearWishlist = async (userId) => {
    const wishlist = await wishlistRepository.ensureWishlist(userId);
    await wishlistRepository.clearWishlist(wishlist.id);

    return wishlistRepository.getWishlistByUserId(userId);
};

export { getWishlist, addProductToWishlist, removeProductFromWishlist, clearWishlist };
