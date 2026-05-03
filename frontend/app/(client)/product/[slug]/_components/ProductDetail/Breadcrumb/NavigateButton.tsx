import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function NavigateButton() {
    return (
        <div className="flex items-center gap-6">
            <Link
                href="#"
                className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
            >
                <ChevronLeft size={16} />
                PREV
            </Link>

            <Link
                href="#"
                className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
            >
                NEXT
                <ChevronRight size={16} />
            </Link>
        </div>
    );
}

export default NavigateButton;
