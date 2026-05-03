"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthStore from "@/stores/useAuthStore";
import { AuthActionResult } from "@/types/auth";

export const useAuthResponse = () => {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const handleResponse = (result: AuthActionResult, successPath: string = "/") => {
        if (!result.success) {
            toast.error(result.error);
            return false;
        }

        login(result.user);
        toast.success(result.message);
        router.push(successPath);
        
        return true;
    };

    return { handleResponse };
};
