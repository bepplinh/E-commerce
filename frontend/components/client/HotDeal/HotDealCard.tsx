import Image from "next/image";
import { IHotDealCard } from "./dataCard";
import { Eye, Heart } from "lucide-react";

export default function HotDealCard({ cardItem }: { cardItem: IHotDealCard }) {
    return (
        <div className="group cursor-pointer w-full max-w-[258px] shrink-0">
            <div className="relative overflow-hidden rounded-sm">
                <Image
                    src={cardItem.imgOne}
                    alt={cardItem.name}
                    width={258}
                    height={312}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Image
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 object-cover w-full h-auto"
                    src={cardItem.imgTwo}
                    alt={cardItem.name}
                    width={258}
                    height={312}
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
