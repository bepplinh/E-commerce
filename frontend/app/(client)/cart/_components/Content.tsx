"use client";

import dynamic from "next/dynamic";
import useCartStore from "@/stores/useCartStore";
import { dataStepper } from "../_constants/dataStepper";
import { useStore } from "@/hooks/useStore";
import CartStepper from "./CartStepper";
import CartReview from "./CartReview/CartReview";
import Bag from "./Bag";
import EmptyBag from "./EmptyBag";
import BagSkeleton from "./BagSkeleton";
import CartShipping from "./CartShipping/CartShipping";

const Checkout = dynamic(() => import("./Checkout"));
const Confirmation = dynamic(() => import("./Confirmation"));

const componentsMap: { [key: string]: React.ComponentType } = {
    Checkout: Checkout,
    Confirmation: Confirmation,
};

function StepContent({
    componentName,
    items,
}: {
    componentName: string;
    items: import("@/types/cart").CartItem[];
}) {
    if (componentName === "Bag") {
        return <Bag items={items} />;
    }

    const Component = componentsMap[componentName];
    return Component ? <Component /> : null;
}

export default function Content() {
    const step = useCartStore((state) => state.step);
    const items = useStore(useCartStore, (state) => state.items);

    if (!items) {
        return <BagSkeleton />;
    }

    if (items.length === 0) {
        return <EmptyBag />;
    }

    const componentName = dataStepper[step - 1].component;

    return (
        <>
            <CartStepper />
            <div className="py-[50px] flex gap-15 justify-between">
                <div className="flex-1">
                    <StepContent componentName={componentName} items={items} />
                </div>

                {step !== 3 && (
                    <div className="sticky top-[50px] h-fit w-full max-w-[420px]">
                        {step === 1 ? <CartReview /> : <CartShipping />}
                    </div>
                )}
            </div>
        </>
    );
}
