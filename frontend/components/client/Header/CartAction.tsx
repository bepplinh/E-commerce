"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/useCartStore";
import { useEffect, useState } from "react";

export default function CartAction() {
    const items = useCartStore((state) => state.items);
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Link
            href="/cart"
            className="-mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer relative"
            aria-label="Cart"
        >
            <ShoppingCart
                size={20}
                className="md:w-6 md:h-6"
                strokeWidth={1.5}
            />
            {mounted && count > 0 && (
                <span className="absolute top-0 right-0 rounded-full bg-[#b9a16b] text-white text-[10px] md:text-xs w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center">
                    {count}
                </span>
            )}
        </Link>
    );
}
