import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    {/* Logo and Contact Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Image
                                src="/images/logo.png"
                                alt="Surfside Media"
                                width={180}
                                height={50}
                                className="h-auto"
                                style={{ height: "auto" }}
                            />
                        </div>
                        <div className="text-gray-500 space-y-3 text-sm leading-relaxed">
                            <p>123 Beach Avenue, Surfside City, CA 00000</p>
                            <p>contact@surfsidemedia.in</p>
                            <p>+1 000-000-0000</p>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-[15px] font-medium text-gray-900 uppercase tracking-wider mb-6">
                            Company
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Affiliates
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-[15px] font-medium text-gray-900 uppercase tracking-wider mb-6">
                            Shop
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Men
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Women
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Shop All
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h3 className="text-[15px] font-medium text-gray-900 uppercase tracking-wider mb-6">
                            Help
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Customer Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Find a Store
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Legal & Privacy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Gift Card
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories Links */}
                    <div>
                        <h3 className="text-[15px] font-medium text-gray-900 uppercase tracking-wider mb-6">
                            Categories
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Shirts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Jeans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Shoes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Bags
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Shop All
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs sm:text-sm text-gray-500">
                    <div>
                        <p>©{currentYear} Surfside Media</p>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <Link
                            href="#"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                            href="#"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
