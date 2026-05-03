import { Suspense } from "react";
import ShopHeader from "./_components/shop-header/ShopHeader";
import ShopBanner from "./_components/shop-header/ShopBanner";
import ProductGrid from "./_components/product-grid/ProductGrid";
import ProductGridSkeleton from "./_components/product-grid/ProductGridSkeleton";
import Pagination from "./_components/pagination";
import FilterSidebar from "./_components/filter-sidebar/FilterSidebar";

export default async function Shop({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const view = Number(params?.view) || 4;
    const page = Number(params?.page) || 1;

    return (
        <div className="flex">
            <div className="w-1/5 mr-[60px]">
                <Suspense
                    fallback={
                        <div className="h-full w-full min-h-[500px] bg-gray-100 animate-pulse rounded-md" />
                    }
                >
                    <FilterSidebar />
                </Suspense>
            </div>

            <div className="flex-1">
                <ShopBanner />
                <ShopHeader />
                <Suspense
                    fallback={<ProductGridSkeleton view={view} />}
                >
                    <ProductGrid view={view} params={params} />
                </Suspense>
                <Pagination currentPage={page} />
            </div>
        </div>
    );
}
