import { actionItems, ActionItem } from "./data/dataAction";
import CartAction from "./CartAction";
import Link from "next/link";
import ProfileAction from "./ProfileAction";
import SearchAction from "./SearchAction";

function Actions() {
    return (
        <div className="flex items-center gap-2 md:gap-4">
            {actionItems.map((item: ActionItem, index: number) => {
                const IconComponent = item.icon;

                const isHiddenOnMobile =
                    item.name === "Search" || item.name === "Wishlist";

                if (item.name === "Profile") {
                    return <ProfileAction key={index} />;
                }

                if (item.name === "Cart") {
                    return <CartAction key={index} />;
                }

                if (item.name === "Search") {
                    return <SearchAction key={index} />;
                }

                return (
                    <Link
                        key={index}
                        href={item.href}
                        className={`p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer ${
                            isHiddenOnMobile ? "hidden md:flex" : "flex"
                        }`}
                        aria-label={item.name}
                    >
                        <IconComponent
                            size={20}
                            className="md:w-6 md:h-6"
                            strokeWidth={1.5}
                        />
                    </Link>
                );
            })}
        </div>
    );
}

export default Actions;
