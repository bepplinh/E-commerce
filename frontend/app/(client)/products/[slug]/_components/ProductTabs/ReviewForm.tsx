"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/shared/ui/Button";

export default function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="mt-16 pt-16 border-t border-gray-100">
            <h3 className="text-[18px] font-medium text-gray-900 mb-2">
                Be the first to review &ldquo;Message Cotton T-Shirt&rdquo;
            </h3>
            <p className="text-[14px] text-gray-500 mb-8">
                Your email address will not be published. Required fields are
                marked *
            </p>

            <form className="space-y-8">
                {/* Rating */}
                <div className="flex items-center gap-4">
                    <span className="text-[14px] text-gray-700">
                        Your rating *
                    </span>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="transition-colors"
                            >
                                <Star
                                    size={14}
                                    fill={
                                        (hover || rating) >= star
                                            ? "#D1D5DB"
                                            : "transparent"
                                    }
                                    className={
                                        (hover || rating) >= star
                                            ? "text-gray-300"
                                            : "text-gray-200"
                                    }
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review Message */}
                <div className="space-y-2">
                    <label
                        className="text-[14px] text-gray-700 block"
                        htmlFor="review"
                    >
                        Your Review
                    </label>
                    <textarea
                        id="review"
                        placeholder=""
                        className="w-full min-h-[200px] border border-gray-200 p-4 focus:border-gray-900 outline-none transition-colors text-[14px]"
                    />
                </div>

                {/* Grid for Name and Email */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label
                            className="text-[14px] text-gray-700 block"
                            htmlFor="name"
                        >
                            Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            className="w-full border-b border-gray-200 py-3 focus:border-gray-900 outline-none transition-colors text-[14px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-[14px] text-gray-700 block"
                            htmlFor="email"
                        >
                            Email address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full border-b border-gray-200 py-3 focus:border-gray-900 outline-none transition-colors text-[14px]"
                        />
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="save-info"
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <label
                        htmlFor="save-info"
                        className="text-[14px] text-gray-500"
                    >
                        Save my name, email, and website in this browser for the
                        next time I comment.
                    </label>
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <Button
                        title="SUBMIT"
                        type="submit"
                        className="w-[180px] h-[54px] rounded-none bg-black text-white text-[14px] font-medium tracking-widest hover:bg-gray-900 transition-colors"
                    />
                </div>
            </form>
        </div>
    );
}
