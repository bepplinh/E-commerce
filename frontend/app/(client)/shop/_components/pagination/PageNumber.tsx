"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function PageNumber() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());

        return `?${params.toString()}`;
    };

    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="relative">
                    <Link
                        href={goToPage(index + 1)}
                        className={clsx(
                            "w-8 h-8 flex items-center justify-center text-sm transition-all pb-1",
                            index + 1 === currentPage
                                ? "text-black underline-active font-medium"
                                : "text-gray-400 underline-hover hover:text-black",
                        )}
                    >
                        {index + 1}
                    </Link>
                </div>
            ))}
        </div>
    );
}
