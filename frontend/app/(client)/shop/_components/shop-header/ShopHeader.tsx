"use client";

import Link from "next/link";
import ShopSortControls from "./ShopSortControls";

export default function ShopHeader() {
    return (
        <div className="flex items-center justify-between border-b border-gray-100 py-6">
            <div className="flex items-center gap-2 text-[14px]">
                <Link
                    href="/"
                    className="text-gray-500 hover:text-black transition-colors text-[16px]"
                >
                    Home
                </Link>
                <span className="text-gray-300">/</span>
                <Link
                    href="/shop"
                    className="font-medium text-black text-[16px]"
                >
                    Shop
                </Link>
            </div>

            <ShopSortControls />
        </div>
    );
}
