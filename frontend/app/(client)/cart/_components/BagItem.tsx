"use client";

import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";
import useCartStore from "@/stores/useCartStore";
import Quantity from "./Quantity";
import DialogConfirm from "@/components/shared/ui/DialogConfirm";

interface BagItemProps {
    item: CartItem;
}

export default function BagItem({ item }: BagItemProps) {
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const trigger = (
        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
        </button>
    );

    return (
        <tr className="border-b border-gray-100 group">
            <td className="py-8">
                <div className="flex items-center gap-8">
                    <div className="relative w-[120px] h-[120px] bg-gray-50 shrink-0 overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-[16px] font-normal text-gray-900 line-clamp-1">
                            {item.title}
                        </h4>
                        <div className="flex flex-col text-[14px] text-gray-500">
                            <span>Color: {item.color}</span>
                            <span>Size: {item.size}</span>
                        </div>
                    </div>
                </div>
            </td>

            <td className="py-8 text-left text-[16px] text-gray-600">
                ${item.price}
            </td>

            <Quantity item={item} />

            <td className="py-8 text-left text-[16px] font-medium text-gray-900">
                ${item.price * item.quantity}
            </td>

            <td className="py-8 text-right">
                <DialogConfirm
                    trigger={trigger}
                    title="Remove Item"
                    description="Are you sure you want to remove this item from your cart?"
                    action={() => removeFromCart(item.id)}
                />
            </td>
        </tr>
    );
}
