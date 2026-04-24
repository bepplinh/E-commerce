"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ButtonAddToCart from "./ButtonAddToCart";

import { Product } from "@/types/product";

interface ImageCardProps {
    images: string[];
    product: Product;
}

export default function ImageCard({ images, product }: ImageCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative group overflow-hidden">
            <div className="relative aspect-3/4 w-full">
                {images.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={src}
                            alt={`product-${index}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-2">
                <button
                    onClick={prevSlide}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors pointer-events-auto cursor-pointer"
                >
                    <ChevronLeft size={20} className="text-gray-400" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors pointer-events-auto cursor-pointer"
                >
                    <ChevronRight size={20} className="text-gray-400" />
                </button>
            </div>

            <ButtonAddToCart product={product} />
        </div>
    );
}
