"use client";

import { useFilterParams } from "@/hooks/useFilterParams";

type FilterItem = {
    id: string | number;
    name: string;
};

export default function ColorCategory({ data = [] }: { data?: FilterItem[] }) {
    const { searchParams, setFilter } = useFilterParams();
    const activeColor = searchParams.get("color");

    const setColor = (color: string) => {
        setFilter({ color });
    };

    return (
        <div className="flex flex-wrap gap-3">
            {data.map((item) => {
                const isActive = activeColor === item.name;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setColor(item.name)}
                        className={`px-3 py-2 text-sm transition-colors border ${
                            isActive
                                ? "border-black text-black"
                                : "border-transparent text-gray-500 hover:text-black hover:border-gray-200"
                        }`}
                    >
                        {item.name}
                    </button>
                );
            })}
        </div>
    );
}
