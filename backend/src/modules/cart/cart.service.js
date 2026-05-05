import * as cartRepo from "./cart.repository.js";
import { NotFoundError, BadRequestError } from "../../utils/app-error.js";

const getCart = async (userId) => {
    const result = await cartRepo.findCartByUserId(userId);
    return result;
};

const addToCart = async ({ variantId, quantity, userId }) => {
    let cart = await cartRepo.findCartByUserId(userId);
    if (!cart) {
        cart = await cartRepo.createCart(userId);
    }

    const cartItem = await cartRepo.upsertCartItem({
        cartId: cart.id,
        variantId,
        quantity,
    });

    return cartItem;
};

const removeFromCart = async ({ userId, variantId }) => {
    const cart = await cartRepo.findCartByUserId(userId);
    if (!cart) throw new NotFoundError("Không tìm thấy giỏ hàng");

    const cartItem = await cartRepo.deleteCartItem({ cartId: cart.id, variantId });
    return cartItem;
};

// Cập nhật số lượng sản phẩm trong giỏ hàng (set số lượng cụ thể)
const updateQuantity = async ({ userId, variantId, quantity }) => {
    if (quantity < 1) throw new BadRequestError("Số lượng phải lớn hơn hoặc bằng 1");

    const cart = await cartRepo.findCartByUserId(userId);
    if (!cart) throw new NotFoundError("Không tìm thấy giỏ hàng");

    // Kiểm tra item có tồn tại trong giỏ không
    const existingItem = cart.items.find((item) => item.variantId === variantId);
    if (!existingItem) throw new NotFoundError("Sản phẩm không có trong giỏ hàng");

    const updatedItem = await cartRepo.updateCartItem({ cartId: cart.id, variantId }, quantity);
    return updatedItem;
};

const clearCart = async (userId) => {
    const cart = await cartRepo.findCartByUserId(userId);
    if (!cart) throw new NotFoundError("Không tìm thấy giỏ hàng");

    return await cartRepo.clearCart(userId);
};

export { addToCart, removeFromCart, getCart, updateQuantity };
