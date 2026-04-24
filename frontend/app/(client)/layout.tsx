import Header from "@/components/client/Header";
import Footer from "@/components/client/Footer";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex flex-col">
            <Header />
            <main className="grow w-full max-w-[1440px] mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
}
