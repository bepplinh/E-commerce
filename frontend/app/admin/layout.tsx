import { AdminSidebar } from "./_components/AdminSidebar";
import { Geist, JetBrains_Mono } from "next/font/google";
import { cn } from "@/libs/utils";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-admin-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-admin-mono",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div
        className={cn(
          "min-h-screen bg-admin-bg text-admin-text-primary selection:bg-[#7c3aed]/30 antialiased flex",
          geistSans.variable,
          jetbrainsMono.variable,
          "font-admin-sans"
        )}
      >
        {/* Noise Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <AdminSidebar />
        
        <main className="relative z-10 flex-1 h-screen overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
