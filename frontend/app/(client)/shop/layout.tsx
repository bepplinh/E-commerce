import { Metadata } from "next";
import { ReactNode } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
    return (
        <div className="px-5 py-12">
            <main className="">{children}</main>
        </div>
    );
}
