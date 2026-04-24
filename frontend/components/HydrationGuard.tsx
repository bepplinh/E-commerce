"use client";

import { ReactNode } from "react";
import { useIsMounted } from "@/hooks/useIsMounted";

interface HydrationGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export function HydrationGuard({
    children,
    fallback = null,
}: HydrationGuardProps) {
    const isMounted = useIsMounted();

    if (!isMounted) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
