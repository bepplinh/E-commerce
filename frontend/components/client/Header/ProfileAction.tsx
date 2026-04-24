"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProfileAction() {
    const isAuth = useAuthStore((state) => state.isAuth);
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isAuth) {
            e.preventDefault();
            toast.warning("You are not logged in");
            router.push("/login");
        }
    };

    return (
        <Link
            href="/profile"
            onClick={handleClick}
            className="-mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer relative"
            aria-label="Profile"
        >
            <UserRound size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
        </Link>
    );
}
