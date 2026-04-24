import { Heart, Share2 } from "lucide-react";

export default function ProductActions() {
    return (
        <div className="flex gap-8 mt-12 mb-16">
            <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors">
                <Heart size={20} />
                ADD TO WISHLIST
            </button>
            <button className="flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors">
                <Share2 size={20} />
                SHARE
            </button>
        </div>
    );
}
