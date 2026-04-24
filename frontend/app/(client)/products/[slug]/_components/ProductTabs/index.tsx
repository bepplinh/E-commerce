"use client";

import { useState, ReactNode } from "react";

interface Tab {
    label: string;
    content: ReactNode;
}

interface ProductTabsProps {
    tabs: Tab[];
}

export default function ProductTabs({ tabs }: ProductTabsProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="mt-20 border-t border-gray-100 pt-12">
            {/* Tab Headers */}
            <div className="flex justify-center gap-12 mb-16">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveIndex(index)}
                        className={`relative py-2 text-[15px] font-medium tracking-widest transition-colors ${
                            activeIndex === index
                                ? "text-black underline-active"
                                : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="max-w-5xl mx-auto px-5 pb-20">
                {tabs[activeIndex]?.content}
            </div>
        </div>
    );
}
