"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import dataMenu from "./data/dataMenu";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="lg:hidden">
            <button
                onClick={toggleMenu}
                className="-ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                aria-label="Toggle Menu"
            >
                <Menu size={24} strokeWidth={1.5} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={toggleMenu}
                />
            )}

            {/* Menu Drawer */}
            <div
                className={`fixed top-0 left-0 w-[80%] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full bg-white text-black p-6">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-medium uppercase tracking-wider">
                            Menu
                        </span>
                        <button
                            onClick={toggleMenu}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                            aria-label="Close Menu"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>
                    </div>

                    <nav>
                        <ul className="flex flex-col gap-6 list-none p-0">
                            {dataMenu.map((item, index) => (
                                <li key={index} className="list-none">
                                    <Link
                                        href={item.link}
                                        className="text-lg font-medium uppercase tracking-wide hover:text-[#b9a16b] transition-colors no-underline block"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-auto pt-8 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">
                            Contact Us
                        </p>
                        <p className="text-sm text-gray-400">
                            info@luxurycar.com
                        </p>
                        <p className="text-sm text-gray-400">+1 234 567 890</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
