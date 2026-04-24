import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyBag() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag
                    size={48}
                    strokeWidth={1}
                    className="text-gray-300"
                />
            </div>

            <h2 className="text-[24px] font-medium text-gray-900 mb-2">
                Your Bag is Empty
            </h2>

            <p className="text-gray-500 max-w-[400px] mb-10 text-[15px]">
                Looks like you haven&apos;t added anything to your bag yet.
                Explore our products and find something you love.
            </p>

            <Link href="/shop">
                <Button className="h-12 px-8 uppercase tracking-widest text-[14px]">
                    Go to Shop
                </Button>
            </Link>
        </div>
    );
}
