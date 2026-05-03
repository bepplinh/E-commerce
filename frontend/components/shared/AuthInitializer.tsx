"use client";
import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import User from "@/types/user";

export default function AuthInitializer({ isAuth, user }: { isAuth: boolean, user: User | null }) {
    useEffect(() => {
        useAuthStore.setState({ isAuth, user });
    }, [isAuth, user]);

    return null;
}
