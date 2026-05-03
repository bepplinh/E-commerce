"use client";

import { Search } from "lucide-react";
import { useFilterParams } from "@/hooks/useFilterParams";

type FilterItem = {
    id: string | number;
    name: string;
};

function BrandCategory({ data = [] }: { data?: FilterItem[] }) {
    const { searchParams, setFilter } = useFilterParams();
    const activeBrands = searchParams.get("brand")?.split(",").filter(Boolean) ?? [];

    const setBrand = (brand: string, checked: boolean) => {
        const nextBrands = checked
            ? [...new Set([...activeBrands, brand])]
            : activeBrands.filter((item) => item !== brand);

        setFilter({ brand: nextBrands.length > 0 ? nextBrands.join(",") : null });
    };

    return (
        <div>
            <div className="relative">
                <input
                    className="border-2 border-gray-200 px-4 py-2 w-full placeholder:font-normal focus:outline-none"
                    type="text"
                    placeholder="Search"
                />
                <Search
                    className="absolute top-1/2 right-3 translate-y-[-50%] text-gray-400"
                    size={20}
                />
            </div>

            <div className="mt-4">
                {data.map((item) => {
                    const checked = activeBrands.includes(item.name);

                    return (
                        <label
                            key={item.id}
                            className="flex items-center gap-4 py-2 cursor-pointer group w-fit"
                        >
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => setBrand(item.name, e.target.checked)}
                                    className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded-none cursor-pointer checked:border-black"
                                />
                                <div className="absolute w-2 h-2 bg-black scale-0 transition-all duration-200 peer-checked:scale-100" />
                            </div>

                            <p className="text-[14px] font-normal">{item.name}</p>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

export default BrandCategory;
