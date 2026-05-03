import NavigateButton from "./NavigateButton";
import Link from "next/link";

function Breadcrumb() {
    return (
        <div className="flex justify-between items-center pb-2 mb-10 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-gray-900">
                <Link
                    href="/"
                    className="hover:text-gray-500 transition-colors"
                >
                    HOME
                </Link>
                <span className="text-gray-300">/</span>
                <Link
                    href="/shop"
                    className="hover:text-gray-500 transition-colors"
                >
                    THE SHOP
                </Link>
            </div>
            <NavigateButton />
        </div>
    );
}

export default Breadcrumb;
