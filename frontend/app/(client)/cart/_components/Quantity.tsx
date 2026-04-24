"use client";

import useCartStore from "@/stores/useCartStore";
import { CartItem } from "@/types/cart";

function Quantity({ item }: { item: CartItem }) {
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    return (
        <td className="py-8">
            <div className="flex items-center justify-start">
                <div className="flex items-center border border-gray-200 w-[110px] h-[45px] justify-between px-4">
                    <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="cursor-pointer text-[18px] text-gray-500 hover:text-black transition-colors"
                    >
                        -
                    </button>
                    <span className="text-[15px] font-normal">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => updateQuantity(item.id)}
                        className="cursor-pointer text-[18px] text-gray-500 hover:text-black transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
        </td>
    );
}

export default Quantity;
