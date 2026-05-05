import prisma from "../../config/prisma.js";

const findCartByUserId = (userId) => {
    return prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    variant: true,
                },
            },
        },
    });
};

const createCart = (userId) => {
    return prisma.cart.create({
        data: {
            userId,
        },
    });
};

const upsertCartItem = ({ cartId, variantId, quantity }) => {
    return prisma.cartItem.upsert({
        where: {
            cartId_variantId: { cartId, variantId },
        },
        update: {
            quantity: { increment: quantity },
        },
        create: {
            cartId,
            variantId,
            quantity,
        },
    });
};

const deleteCartItem = ({ cartId, variantId }) => {
    return prisma.cartItem.delete({
        where: {
            cartId_variantId: { cartId, variantId },
        },
    });
};

const updateCartItem = ({ cartId, variantId }, quantity) => {
    return prisma.cartItem.update({
        where: {
            cartId_variantId: { cartId, variantId },
        },
        data: { quantity },
    });
};

const clearCart = (userId) => {
    return prisma.cart.delete({
        where: { userId },
    });
};
export { findCartByUserId, createCart, upsertCartItem, deleteCartItem, updateCartItem, clearCart };
