"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const dataImage = [
    "/product_list/product_0-2.jpg",
    "/product_list/product_0-1.jpg",
    "/product_list/product_0-3.jpg",
    "/product_list/product_0.jpg",
];

function ProductImage() {
    const [currentIndexImage, setCurrentIndexImage] = useState(0);

    const prevImage = () => {
        setCurrentIndexImage((prev) =>
            prev === 0 ? dataImage.length - 1 : prev - 1,
        );
    };

    const nextImage = () => {
        setCurrentIndexImage((prev) =>
            prev === dataImage.length - 1 ? 0 : prev + 1,
        );
    };

    return (
        <div className="flex gap-4 px-5">
            <div className="flex flex-col gap-2">
                {dataImage.map((src, index) => (
                    <div
                        key={src}
                        className={`relative w-[104px] h-[104px] cursor-pointer transition-all duration-300 border-2 ${
                            index === currentIndexImage
                                ? "border-gray-600 opacity-100"
                                : "border-transparent opacity-40 hover:opacity-70"
                        }`}
                        onClick={() => setCurrentIndexImage(index)}
                    >
                        <Image src={src} alt="" fill className="object-cover" sizes="104px" />
                    </div>
                ))}
            </div>

            <div className="relative group w-[674px] h-[674px] overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{
                        transform: `translateX(-${currentIndexImage * 100}%)`,
                    }}
                >
                    {dataImage.map((src, index) => (
                        <div
                            key={index}
                            className="relative shrink-0 w-full h-full"
                        >
                            <Image
                                src={src}
                                alt={`product-${index}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 674px"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                >
                    <ChevronLeft size={24} className="text-black" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                >
                    <ChevronRight size={24} className="text-black" />
                </button>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {dataImage.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 transition-all duration-300 rounded-full ${
                                index === currentIndexImage
                                    ? "w-8 bg-black"
                                    : "w-2 bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductImage;
