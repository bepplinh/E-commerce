import { Suspense } from "react";
import ShopHeader from "./_components/shop-header/ShopHeader";
import ShopBanner from "./_components/shop-header/ShopBanner";
import ProductGrid from "./_components/product-grid/ProductGrid";
import FilterAccordion from "./_components/filter-sidebar/FilterAccordion";
import ProductGridSkeleton from "./_components/product-grid/ProductGridSkeleton";
import Pagination from "./_components/pagination";

import { dataShopCategory } from "./_constants/data-shop-category";

export default async function Shop({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const view = Number(params?.view) || 4;
    const page = Number(params?.page) || 1;

    const filters = {
        category: params.category,
        minPrice: Number(params.minPrice) || 0,
        maxPrice: Number(params.maxPrice) || 1000,
        color: params.color,
        size: params.size,
        brand: params.brand,
        sort: params.sort,
    };

    return (
        <div className="flex">
            <div className="w-1/5 mr-[60px]">
                <div className="sticky top-10 h-fit max-h-[calc(100vh-40px)] overflow-y-auto scrollbar-hide space-y-6 pb-10">
                    {dataShopCategory.map((item) => (
                        <FilterAccordion
                            key={item.filterKey}
                            title={item.title}
                            filterKey={item.filterKey}
                        >
                            <item.Component />
                        </FilterAccordion>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <ShopBanner />
                <ShopHeader />
                <Suspense fallback={<ProductGridSkeleton view={view} />}>
                    <ProductGrid view={view} />
                </Suspense>
                <Pagination currentPage={page} />
            </div>
        </div>
    );
}
