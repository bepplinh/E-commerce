"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useFilterParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setFilter = useCallback(
        (key: string, value: string | null) => {
            const current = new URLSearchParams(
                Array.from(searchParams.entries()),
            );
            if (value === null) current.delete(key);
            else current.set(key, value);
            router.push(`${pathname}?${current.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    return { searchParams, setFilter };
}
