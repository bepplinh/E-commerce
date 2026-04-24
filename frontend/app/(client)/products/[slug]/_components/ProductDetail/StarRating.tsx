import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    reviews: string;
}

export default function StarRating({ rating, reviews }: StarRatingProps) {
    return (
        <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        size={10}
                        fill={index < rating ? "#FFB800" : "none"}
                        className={
                            index < rating ? "text-[#FFB800]" : "text-gray-300"
                        }
                    />
                ))}
            </div>
            <span className="text-gray-400 text-sm">{reviews} reviews</span>
        </div>
    );
}
