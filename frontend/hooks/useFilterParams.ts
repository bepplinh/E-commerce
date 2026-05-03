"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import updateSearchParams from "@/helpers/updateSearchParams";

type SearchParamValue = string | number | boolean | null | undefined;

export function useFilterParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setFilter = useCallback(
        (updates: Record<string, SearchParamValue>, options: { resetPage?: boolean } = { resetPage: true }) => {
            const query = updateSearchParams(searchParams, updates, options);
            router.replace(`${pathname}${query}`, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    return { searchParams, setFilter };
}
