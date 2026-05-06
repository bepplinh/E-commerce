"use client";

import { useTransition } from "react";
import useCartStore from "@/stores/useCartStore";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { addToCartAction } from "@/actions/cart-actions";

export default function ButtonAddToCart({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const cartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1,
            color: product.colors[0],
            size: product.sizes[0],
        };

        addToCart(cartItem);
        toast.success("Đã thêm vào giỏ hàng");

        startTransition(async () => {
            const result = await addToCartAction(cartItem);
            if (!result.success) {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="absolute bottom-0 left-2 right-2 translate-y-full opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 transition-all duration-300 ease-out">
            <button
                onClick={handleAddToCart}
                className="w-full bg-white py-2.5 font-medium uppercase text-sm shadow-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
                add to cart
            </button>
        </div>
    );
}
