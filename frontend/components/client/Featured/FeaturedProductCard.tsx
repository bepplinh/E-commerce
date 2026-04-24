import Image from "next/image";
import { IFeaturedProduct } from "./dataFeaturedProduct";
import { Eye, Heart } from "lucide-react";

export default function FeaturedProductCard({
    cardItem,
}: {
    cardItem: IFeaturedProduct;
}) {
    return (
        <div className="group cursor-pointer w-full">
            <div className="relative overflow-hidden rounded-sm aspect-3/4 w-full">
                <Image
                    src={cardItem.img}
                    alt={cardItem.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="relative mt-4 h-12 overflow-hidden">
                {/* Default Information: Name and Price */}
                <div className="flex flex-col items-start transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-full">
                    <h3 className="text-[16px] text-gray-900">
                        {cardItem.name}
                    </h3>
                    <p className="text-sm text-[#767676]">${cardItem.price}</p>
                </div>

                {/* Hover Actions: Add to Cart, Quick View, Wishlist */}
                <div className="absolute inset-0 flex items-center justify-between opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <button className="text-[13px] font-medium uppercase tracking-tight border-b-2 border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all">
                        Add to cart
                    </button>
                    <div className="flex gap-4 text-gray-600">
                        <button className="hover:text-black transition-colors">
                            <Eye size={20} />
                        </button>
                        <button className="hover:text-black transition-colors">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
