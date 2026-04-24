import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import PageNumber from "./PageNumber";

export default async function Pagination({
    currentPage,
}: {
    currentPage: number;
}) {
    return (
        <div className="flex justify-between items-center mt-12 mb-20">
            <div>
                <Link
                    href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"}
                    className={clsx(
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        currentPage > 1
                            ? "text-black hover:text-[#b9a16b]"
                            : "text-gray-300 pointer-events-none",
                    )}
                >
                    <ChevronLeft size={18} />
                    <span>PREV</span>
                </Link>
            </div>

            <div>
                <PageNumber />
            </div>

            <div>
                <Link
                    href={currentPage < 5 ? `?page=${currentPage + 1}` : "#"}
                    className={clsx(
                        "flex items-center gap-1 text-sm font-medium transition-colors",
                        currentPage < 5
                            ? "text-black hover:text-[#b9a16b]"
                            : "text-gray-300 pointer-events-none",
                    )}
                >
                    <span>NEXT</span>
                    <ChevronRight size={18} />
                </Link>
            </div>
        </div>
    );
}
