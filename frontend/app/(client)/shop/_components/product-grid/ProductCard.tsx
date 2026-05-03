"use client";

import { Heart, Star } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const ProductImageSlider = dynamic(() => import("./ProductImageSlider"), {
    ssr: true,
});

import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
    const [activeColorIndex, setActiveColorIndex] = useState<number>(0);
    const router = useRouter();
    const handleClickCard = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        router.push(`/product/${product.slug}`);
    };
    const handleClickWishlist = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        console.log("Wishlist");
    };

    return (
        <div className="group cursor-pointer" onClick={handleClickCard}>
            <ProductImageSlider
                images={product.images}
                product={product}
                activeColorIndex={activeColorIndex}
            />

            <div className="flex justify-between items-center mt-3 mb-1">
                <p className="font-normal text-gray-400">{product.category}</p>
                <Heart
                    size={16}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                />
            </div>
            <div>
                <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors">
                    {product.title}
                </h3>
            </div>
            <div className="mt-1 flex items-center justify-between">
                <span className="font-medium text-gray-900">
                    ${product.price}
                </span>

                {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-1.5">
                        {product.colors.map((color, index) => {
                            const isWhite = color.toLowerCase() === "white";
                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() =>
                                        setActiveColorIndex(index)
                                    }
                                    className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                                        activeColorIndex === index
                                            ? "ring-1 ring-offset-1 ring-black border-transparent"
                                            : isWhite
                                              ? "border border-gray-300"
                                              : "border border-transparent"
                                    }`}
                                    style={{
                                        backgroundColor: color.toLowerCase(),
                                    }}
                                    title={color}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                            key={index}
                            size={10}
                            fill={index < product.rating ? "black" : "none"}
                            className={
                                index < product.rating
                                    ? "text-black"
                                    : "text-gray-300"
                            }
                        />
                    ))}
                </div>
                <span className="text-[12px] text-gray-500">
                    {product.reviews} reviews
                </span>
            </div>
        </div>
    );
}
