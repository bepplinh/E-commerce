import Actions from "./Actions";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Search from "@/components/client/Search";

export default function Header() {
    return (
        <header className="relative w-full z-50 bg-white border-b border-gray-100">
            <div className="flex w-full items-center justify-between p-5 max-w-[1440px] mx-auto">
                {/* Left Block: MobileMenu (on mobile) / Logo (on desktop) */}
                <div className="flex flex-1 lg:flex-none items-center ">
                    <div className="lg:hidden">
                        <MobileMenu />
                    </div>
                    <div className="hidden lg:block">
                        <Logo />
                    </div>
                </div>

                {/* Center Block: Logo (on mobile) / Navigation (on desktop) */}
                <div className="flex flex-1 justify-center lg:flex-auto">
                    <div className="lg:hidden">
                        <Logo />
                    </div>
                    <div className="hidden lg:block">
                        <Navigation />
                    </div>
                </div>

                {/* Right Block: Actions (always) */}
                <div className="flex flex-1 justify-end lg:flex-none">
                    <Actions />
                </div>
            </div>

            <Search />
        </header>
    );
}
