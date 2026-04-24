"use client";

import { useRef } from "react";
import useAppStore from "@/stores/useAppStore";
import useClickOutside from "@/hooks/useClickOutside";
import { Search as SearchIcon } from "lucide-react";

function Search() {
    const isSearch = useAppStore((state) => state.isSearch);
    const setIsSearch = useAppStore((state) => state.setIsSearch);
    const searchRef = useRef<HTMLDivElement>(null);

    useClickOutside(searchRef, () => {
        if (isSearch) setIsSearch(false);
    });

    if (!isSearch) return null;

    return (
        <div
            ref={searchRef}
            className="absolute top-full left-0 right-0 h-[400px] py-14 bg-white z-50 shadow-xl overflow-hidden border-t"
        >
            <div className="max-w-[1440px] mx-auto px-5 h-full">
                <p className="uppercase text-[#767676] font-medium mb-6">
                    What are you looking for?
                </p>

                <div className="relative pb-3 w-full border-b-2 border-[#767676]">
                    <input
                        type="text"
                        placeholder="Search products, brands, categories,...."
                        className="w-full placeholder:text-[#767676] font-medium"
                    />

                    <SearchIcon className="absolute right-0 top-0 text-[#767676]" />
                </div>
            </div>
        </div>
    );
}

export default Search;
