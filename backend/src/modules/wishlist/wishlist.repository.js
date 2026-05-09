import prisma from "../../config/prisma.js";

const wishlistInclude = {
    items: {
        orderBy: {
            addedAt: "desc",
        },
        include: {
            product: {
                include: {
                    brand: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                    images: {
                        where: { isPrimary: true, variantId: null },
                        select: { imageUrl: true },
                        take: 1,
                    },
                    variants: {
                        where: { isActive: true },
                        select: {
                            id: true,
                            price: true,
                            stockQuantity: true,
                        },
                    },
                },
            },
        },
    },
};

const getWishlistByUserId = (userId) => {
    return prisma.wishlist.findUnique({
        where: { userId },
        include: wishlistInclude,
    });
};

const ensureWishlist = (userId) => {
    return prisma.wishlist.upsert({
        where: { userId },
        update: {},
        create: { userId },
    });
};

const findWishlistItem = (wishlistId, productId) => {
    return prisma.wishlistItem.findUnique({
        where: {
            wishlistId_productId: { wishlistId, productId },
        },
        include: {
            product: true,
        },
    });
};

const createWishlistItem = ({ wishlistId, productId }) => {
    return prisma.wishlistItem.create({
        data: {
            wishlistId,
            productId,
        },
    });
};

const deleteWishlistItem = ({ wishlistId, productId }) => {
    return prisma.wishlistItem.delete({
        where: {
            wishlistId_productId: { wishlistId, productId },
        },
    });
};

const clearWishlist = (wishlistId) => {
    return prisma.wishlistItem.deleteMany({
        where: { wishlistId },
    });
};

export {
    wishlistInclude,
    getWishlistByUserId,
    ensureWishlist,
    findWishlistItem,
    createWishlistItem,
    deleteWishlistItem,
    clearWishlist,
};
