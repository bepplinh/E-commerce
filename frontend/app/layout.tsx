import type { Metadata } from "next";
import "./globals.css";
import { Jost, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { cn } from "@/libs/utils";
import { getAuthUser } from "@/libs/auth";
import AuthInitializer from "@/components/shared/AuthInitializer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Ecommerce",
    description: "Thuong mai dien tu",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAuth, user } = await getAuthUser();

    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("h-full", "antialiased", jost.className, "font-sans", geist.variable)}
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <AuthInitializer isAuth={isAuth} user={user} />
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
