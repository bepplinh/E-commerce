"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { HydrationGuard } from "@/components/HydrationGuard";

const dataSort = [
    { id: 1, name: "Default Sorting" },
    { id: 2, name: "Price: Low to High" },
    { id: 3, name: "Price: High to Low" },
    { id: 4, name: "Newest" },
    { id: 5, name: "Oldest" },
];

const dataView = [
    { id: 1, title: "2" },
    { id: 2, title: "3" },
    { id: 3, title: "4" },
];

export default function SortAndViewController() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const view = Number(searchParams.get("view")) || 4;

    const setView = (newView: number) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set("view", newView.toString());
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
    };

    return (
        <HydrationGuard>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-[14px] text-gray-500 uppercase ">
                        Sort by:
                    </span>
                    <select
                        name="sort"
                        id="sort"
                        className="text-[14px] font-medium bg-transparent focus:outline-none cursor-pointer"
                    >
                        {dataSort.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="self-stretch w-0.5 bg-gray-200"></div>

                <div className="flex items-center gap-4">
                    <span className="text-[14px] text-gray-500 uppercase">
                        View:
                    </span>
                    <div className="flex items-center gap-3">
                        {dataView.map((item) => (
                            <div key={item.id} className="relative">
                                <span
                                    onClick={() =>
                                        setView(parseInt(item.title))
                                    }
                                    className={`text-[14px] font-medium transition-colors cursor-pointer inline-block 
                                    ${
                                        view === parseInt(item.title)
                                            ? "text-black underline-active"
                                            : "text-gray-400 hover:text-black underline-hover"
                                    }`}
                                >
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </HydrationGuard>
    );
}
