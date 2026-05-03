"use client";
import React, { useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";
import useCategoryShopStore, {
    FilterTypes,
} from "@/stores/useCategoryShopStore";

interface SelectCategoryProps {
    children: React.ReactNode;
    title: string;
    filterKey: FilterTypes;

}

export default function FilterAccordion({
    children,
    title,
    filterKey,

}: SelectCategoryProps) {
    const toggleFilter = useCategoryShopStore((state) => state.toggleFilter);
    const isOpen = useCategoryShopStore((state) => state.isOpen[filterKey]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const activeOpen = mounted ? isOpen : true;

    return (
        <div className="border-gray-100 pb-4">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFilter(filterKey)}
                suppressHydrationWarning
            >
                <h5 className="uppercase text-[18px] font-medium transition-colors">
                    {title}
                </h5>
                <ChevronDown
                    className={`${
                        activeOpen ? "-rotate-180" : "rotate-0"
                    } transition-all duration-500 text-[#222222]`}
                    size={18}
                />
            </div>

            <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    activeOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
                suppressHydrationWarning
            >
                <div className="overflow-hidden min-h-0 flex flex-col">
                    <div className="pt-4">{children}</div>
                </div>
            </div>
        </div>
    );
}
