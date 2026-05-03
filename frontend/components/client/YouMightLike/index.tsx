"use client";
import { useRef } from "react";
import ItemCategory from "./ItemCategory";
import { dataCategory } from "./dataCategory";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function YouMightLike() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.6; // Scroll by 60% of container width
            const scrollTo =
                direction === "left"
                    ? scrollLeft - scrollAmount
                    : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-6 md:py-10">
            <div className="w-full max-w-[1440px] mx-auto px-5">
                <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
                    You Might Like
                </h2>

                <div className="relative group">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all hidden md:flex items-center justify-center border border-gray-100 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={24} className="text-[#222]" />
                    </button>

                    {/* Carousel */}
                    <div
                        ref={scrollRef}
                        className="max-w-full overflow-x-auto flex flex-nowrap gap-6 md:gap-10 items-center py-4 px-1 scrollbar-hide"
                    >
                        {dataCategory.map((item, index) => (
                            <div key={item.id} className="shrink-0">
                                <ItemCategory item={item} priority={index < 4} />
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all hidden md:flex items-center justify-center border border-gray-100 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
                        aria-label="Next"
                    >
                        <ChevronRight size={24} className="text-[#222]" />
                    </button>
                </div>
            </div>
        </section>
    );
}
