"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const data = ["XS", "S", "M", "L", "XL", "XXL"];

function SizeCategory() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const size = searchParams.get("size");

    const setSize = (newSize: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("size", newSize);
        router.push(`${pathname}?${current.toString()}`, { scroll: false });
    };
    return (
        <div className="flex gap-6 flex-wrap">
            {data.map((item) => (
                <div key={item}>
                    <button
                        className={`px-4 py-1 font-normal text-sm border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer ${size === item ? "bg-gray-300" : ""}`}
                        onClick={() => setSize(item)}
                    >
                        {item}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SizeCategory;
