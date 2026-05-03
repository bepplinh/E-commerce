"use client";

import Image from "next/image";
import slide_show from "@/public/images/slideshow-character1.png";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Banner() {
    return (
        <div className="relative min-h-[500px] lg:min-h-[700px] flex items-center overflow-hidden">
            <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 items-center gap-10 relative z-10">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        staggerChildren: 0.3,
                    }}
                    className="flex flex-col items-start z-10 order-2 md:order-1"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <span className="w-10 h-[1.5px] bg-black"></span>
                        <h6 className="uppercase tracking-[0.2em] text-[12px] lg:text-[14px] font-medium text-gray-800">
                            new arrivals
                        </h6>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1.2,
                            delay: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-[50px] lg:text-[70px] leading-[1.1] text-[#222] mb-10"
                    >
                        Night Spring <br />
                        <span className="font-medium bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500">
                            Dresses
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.5 }}
                    >
                        <Link
                            href={"/"}
                            className="relative group inline-flex overflow-hidden font-medium text-[12px] uppercase tracking-wider pb-1 hover:text-black transition-colors duration-500"
                        >
                            <span className="relative inline-flex flex-col h-[1.2em] overflow-hidden">
                                <span className="transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                                    Shop Now
                                </span>
                                <span className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0 text-black">
                                    Shop Now
                                </span>
                            </span>
                            <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-black origin-right transform scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100 group-hover:origin-left"></span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <div className="relative flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative w-[300px] lg:w-[500px] aspect-4/5">
                        <div className="absolute inset-0 z-10">
                            <Image
                                src={slide_show}
                                alt="Night Spring Dresses"
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 300px, 500px"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Left Navigation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="absolute bottom-10 lg:bottom-15 left-5 flex items-center gap-2 text-[13px] font-medium text-gray-400 z-10"
            >
                <div className="text-black cursor-pointer relative overflow-hidden group w-5 h-5 flex flex-col justify-center">
                    <span className="absolute inset-x-0 transition-transform duration-500 translate-y-0 group-hover:-translate-y-full flex items-center justify-center">
                        01
                    </span>
                    <span className="absolute inset-x-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 flex items-center justify-center text-gray-800">
                        01
                    </span>
                </div>
                <span className="w-10 h-[1.5px] bg-gray-200 group-hover:bg-black transition-colors duration-500"></span>
                <div className="cursor-pointer transition-colors hover:text-black relative overflow-hidden group w-5 h-5 flex flex-col justify-center">
                    <span className="absolute inset-x-0 transition-transform duration-500 translate-y-0 group-hover:-translate-y-full flex items-center justify-center">
                        02
                    </span>
                    <span className="absolute inset-x-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 flex items-center justify-center text-black">
                        02
                    </span>
                </div>
                <span className="w-10 h-[1.5px] bg-gray-200 group-hover:bg-black transition-colors duration-500"></span>
                <div className="cursor-pointer transition-colors hover:text-black relative overflow-hidden group w-5 h-5 flex flex-col justify-center">
                    <span className="absolute inset-x-0 transition-transform duration-500 translate-y-0 group-hover:-translate-y-full flex items-center justify-center">
                        03
                    </span>
                    <span className="absolute inset-x-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 flex items-center justify-center text-black">
                        03
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
