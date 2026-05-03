"use client";

import { useFilterParams } from "@/hooks/useFilterParams";

type FilterItem = {
    id: string | number;
    name: string;
};

export default function ProductCategory({ data = [] }: { data?: FilterItem[] }) {
    const { searchParams, setFilter } = useFilterParams();
    const activeCategory = searchParams.get("category");

    const setCategory = (category: string) => {
        setFilter({ category });
    };

    return (
        <div className="flex flex-col gap-2">
            {data.map((item) => {
                const isActive = activeCategory === item.name;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setCategory(item.name)}
                        className={`text-left text-sm py-1 transition-colors ${
                            isActive ? "text-black font-medium" : "text-gray-500 hover:text-black"
                        }`}
                    >
                        {item.name}
                    </button>
                );
            })}
        </div>
    );
}
