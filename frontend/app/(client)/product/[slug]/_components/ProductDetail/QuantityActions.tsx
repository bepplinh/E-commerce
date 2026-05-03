"use client";

import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import Button from "@/components/shared/ui/Button";

export default function QuantityActions() {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex gap-4 mb-10">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <Button
                title="add to cart"
                className="uppercase font-medium w-[250px] text-[14px]"
            />
        </div>
    );
}
