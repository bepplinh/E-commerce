import Link from "next/link";
import { ICategoryItem } from "./dataCategory";
import Image from "next/image";

export default function ItemCategory({
    item,
    priority = false,
}: {
    item: ICategoryItem;
    priority?: boolean;
}) {
    return (
        <div className="flex flex-col items-center gap-4 md:gap-6 shrink-0">
            <div className="w-[80px] h-[80px] md:w-[124px] md:h-[124px] relative">
                <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 80px, 124px"
                    priority={priority}
                />
            </div>
            <Link
                href="#"
                className="text-xs md:text-sm font-medium text-center transition-colors no-underline max-w-[50px]"
            >
                {item.name}
            </Link>
        </div>
    );
}
