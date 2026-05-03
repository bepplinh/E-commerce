"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (val: number | ((prev: number) => number)) => void;
}

export default function QuantitySelector({
    quantity,
    setQuantity,
}: QuantitySelectorProps) {
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex items-center border border-gray-200 w-fit px-4 py-4 gap-8">
            <button
                onClick={decrement}
                className="hover:text-black transition-colors text-gray-400"
            >
                <Minus size={12} />
            </button>
            <span className="w-4 text-center">{quantity}</span>
            <button
                onClick={increment}
                className="hover:text-black transition-colors text-gray-400"
            >
                <Plus size={12} />
            </button>
        </div>
    );
}
