"use client";

import BagItem from "./BagItem";
import { CartItem } from "@/types/cart";

interface BagProps {
    items: CartItem[];
}

export default function Bag({ items }: BagProps) {
    return (
        <>
            <div className="w-full">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="uppercase text-[14px] font-medium tracking-widest text-gray-900 border-b border-gray-100">
                            <td className="w-[45%] pb-4 text-left">Product</td>
                            <td className="w-[15%] pb-4 text-left">Price</td>
                            <td className="w-[20%] pb-4 text-left">Quantity</td>
                            <td className="w-[15%] pb-4 text-left">Subtotal</td>
                            <td className="w-[5%] pb-4"></td>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <BagItem key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 p-4 border-2 border-gray-200 inline-block focus-within:border-black transition-colors">
                <input
                    type="text"
                    placeholder="Coupon Code"
                    className="w-64 outline-none placeholder:text-gray-500 placeholder:text-[14px]"
                />
                <button className="uppercase mr-2 font-medium text-[16px] cursor-pointer">
                    apply coupon
                </button>
            </div>
        </>
    );
}
