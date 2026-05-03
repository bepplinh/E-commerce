import Image from "next/image";

export default function Banner() {
    return (
        <div className="flex mb-8">
            <div className="bg-[#f5e6e0] w-[420px] h-[500px] p-16 flex items-start justify-center flex-col">
                <div className="flex flex-col mb-8">
                    <h2 className="text-[40px] font-normal uppercase leading-[1.1] tracking-tight">
                        women&apos;s
                    </h2>
                    <h1 className="text-[40px] font-medium uppercase leading-[1.1] tracking-tight">
                        accessories
                    </h1>
                </div>
                <p className="text-[16px] leading-[1.6] text-[#222]">
                    Accessories are the best way to update your look. Add a
                    little edge with new styles and new colors, or go for
                    timeless pieces.
                </p>
            </div>

            <div className="flex-1 relative h-[500px]">
                <Image
                    src="/shop/banner.jpg"
                    alt="banner"
                    priority
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                />
            </div>
        </div>
    );
}
