"use client";

import Link from "next/link";
import { UserRound, User, Package, Heart, LogOut, ChevronRight } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleLogout as logoutServer } from "@/actions/auth/logout";

export default function ProfileAction() {
    const { isAuth, logout } = useAuthStore();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (!isAuth) {
            e.preventDefault();
            toast.warning("Bạn chưa đăng nhập");
            router.push("/login");
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutServer();
            logout();
            
            toast.success("Đã đăng xuất thành công");
            setIsOpen(false);
            router.push("/");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đăng xuất");
        }
    };


    const menuItems = [
        { icon: <User size={18} />, label: "Thông tin cá nhân", href: "/profile" },
        { icon: <Package size={18} />, label: "Đơn hàng của tôi", href: "/orders" },
        { icon: <Heart size={18} />, label: "Sản phẩm yêu thích", href: "/favorites" },
    ];

    return (
        <div className="relative">
            <div
               onClick={handleClick}
                className="relative"
            >
                <button
                    className="-mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer focus:outline-none"
                    aria-label="Profile"
                >
                    <UserRound size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </button>

                {/* Dropdown Menu - Pure Tailwind CSS */}
                {isAuth && (
                    <div
                        className={`absolute top-full right-0 mt-2 w-[260px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 py-2 transition-all duration-200 ease-out origin-top-right ${
                            isOpen 
                                ? "opacity-100 scale-100 translate-y-0 visible" 
                                : "opacity-0 scale-95 -translate-y-2 invisible"
                        }`}
                    >
                        <div className="px-4 py-3 border-b border-gray-50 mb-1">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tài khoản</p>
                            <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">Xin chào, Thành viên</p>
                        </div>

                        <div className="py-1">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            ))}
                        </div>

                        <div className="mt-1 pt-1 border-t border-gray-50">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                            >
                                <LogOut size={18} />
                                <span className="font-medium">Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
