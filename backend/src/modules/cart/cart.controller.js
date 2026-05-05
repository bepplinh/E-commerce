import * as cartService from "./cart.service.js";

const getCart = async (req, res) => {
    const userId = req.user.id;

    const result = await cartService.getCart(userId);

    res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        data: result,
    });
};

const addToCart = async (req, res) => {
    const { variantId, quantity } = req.body;
    const userId = req.user.id;

    const result = await cartService.addToCart({ variantId, quantity, userId });

    res.status(200).json({
        success: true,
        status: 201,
        message: "Added to cart successfully",
        data: result,
    });
};

const removeFromCart = async (req, res) => {
    const { variantId } = req.body;
    const userId = req.user.id;

    const result = await cartService.removeFromCart({ variantId, userId });

    res.status(200).json({
        success: true,
        message: "Removed from cart successfully",
        data: result,
    });
};

// PATCH /api/cart/item — cập nhật số lượng sản phẩm cụ thể
const updateQuantity = async (req, res) => {
    const { variantId, quantity } = req.body;
    const userId = req.user.id;

    const result = await cartService.updateQuantity({ variantId, quantity: parseInt(quantity), userId });

    res.status(200).json({
        success: true,
        message: "Quantity updated successfully",
        data: result,
    });
};

const clearCart = async (req, res) => {
    const userId = req.user.id;
    const result = await cartService.clearCart(userId);

    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
        data: result,
    });
};

export { addToCart, removeFromCart, getCart, updateQuantity, clearCart };
