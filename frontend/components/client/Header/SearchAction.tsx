"use client";

import { Search } from "lucide-react";
import useAppStore from "@/stores/useAppStore";

export default function SearchAction() {
    const isSearch = useAppStore((state) => state.isSearch);
    const setIsSearch = useAppStore((state) => state.setIsSearch);

    return (
        <button
            onClick={() => setIsSearch(!isSearch)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer hidden md:flex"
            aria-label="Search"
        >
            <Search size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
        </button>
    );
}
