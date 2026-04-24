import { Heart, Star } from "lucide-react";
import dynamic from "next/dynamic";

const ProductImageSlider = dynamic(() => import("./ProductImageSlider"), {
    ssr: true,
});

import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group cursor-pointer">
            <ProductImageSlider images={product.images} product={product} />

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
            <div className="mt-1">
                <span className="font-medium text-gray-900">
                    ${product.price}
                </span>
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
