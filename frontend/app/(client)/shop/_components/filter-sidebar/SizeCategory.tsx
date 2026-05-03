"use client";

import { useFilterParams } from "@/hooks/useFilterParams";

type FilterItem = {
    id: string | number;
    name: string;
};

function SizeCategory({ data = [] }: { data?: FilterItem[] }) {
    const { searchParams, setFilter } = useFilterParams();

    const size = searchParams.get("size");

    const setSize = (newSize: string) => {
        setFilter({ size: newSize });
    };
    return (
        <div className="flex gap-6 flex-wrap">
            {data.map((item) => (
                <div key={item.id}>
                    <button
                        className={`px-4 py-1 font-normal text-sm border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer ${size === item.name ? "bg-gray-300" : ""}`}
                        onClick={() => setSize(item.name)}
                    >
                        {item.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default SizeCategory;
