import Link from "next/link";
import SliderHotDeal from "./SliderHotDeal";

export default function HotDeal() {
    return (
        <section className="py-6 md:py-10">
            <div className="w-full max-w-[1440px] mx-auto px-5">
                <h2 className="text-4xl text-black font-medium text-center pb-4 mb-6">
                    Hot Deals
                </h2>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
                    <div className="w-full lg:w-[240px] shrink-0 flex flex-col items-start gap-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl lg:text-2xl font-medium tracking-tight leading-none text-black mb-6">
                                Summer Sale
                            </h2>
                            <h2 className="text-3xl lg:text-2xl font-medium tracking-tight leading-none text-black">
                                Up to 60% Off
                            </h2>
                        </div>
                        <Link
                            href="#"
                            className="text-sm font-medium uppercase tracking-widest hover:text-gray-600 transition-all inline-block underline-expand [--underline-start-width:60%]"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <SliderHotDeal />
                    </div>
                </div>
            </div>
        </section>
    );
}
