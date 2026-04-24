"use client";

import useCartStore from "@/stores/useCartStore";
import { Stepper } from "../_constants/dataStepper";

export default function Step({ item }: { item: Stepper }) {
    const step = useCartStore((state) => state.step);
    const setStep = useCartStore((state) => state.setStep);
    return (
        <div
            className={`flex border-b-2 ${item.id <= step ? "border-black" : "border-gray-200"} flex-1 gap-4 pb-4`}
            onClick={() => setStep(item.id)}
        >
            <div className="flex items-start">
                <span className="text-lg font-medium">0{item.id}</span>
            </div>

            <div className="flex flex-col justify-between">
                <span className="text-lg font-medium uppercase">
                    {item.title}
                </span>
                <span className="text-sm text-gray-500">
                    {item.description}
                </span>
            </div>
        </div>
    );
}
