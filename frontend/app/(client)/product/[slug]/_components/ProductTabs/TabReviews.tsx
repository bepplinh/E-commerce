import { Star } from "lucide-react";
import ReviewForm from "./ReviewForm";

const dummyReviews = [
    {
        id: 1,
        author: "Janice Miller",
        date: "April 06, 2023",
        rating: 5,
        content:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est...",
    },
    {
        id: 2,
        author: "Benjam Porter",
        date: "April 06, 2023",
        rating: 5,
        content:
            "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est...",
    },
];

export default function TabReviews() {
    return (
        <div className="space-y-12">
            <h2 className="text-[20px] font-medium text-gray-900">Reviews</h2>

            <div className="space-y-12">
                {dummyReviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex gap-6 pb-12 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                        {/* Avatar Placeholder */}
                        <div className="w-16 h-16 rounded-full bg-gray-100 shrink-0" />

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-[15px] font-medium text-gray-900">
                                        {review.author}
                                    </h4>
                                    <p className="text-[13px] text-gray-400">
                                        {review.date}
                                    </p>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={10}
                                            fill="#D1CBBA"
                                            className="text-[#D1CBBA]"
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[14px] text-gray-500 leading-relaxed text-pretty">
                                {review.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <ReviewForm />
        </div>
    );
}
