import ProductCategory from "../_components/filter-sidebar/ProductCategory";
import ColorCategory from "../_components/filter-sidebar/ColorCategory";
import { FilterTypes } from "@/stores/useCategoryShopStore";
import SizeCategory from "../_components/filter-sidebar/SizeCategory";
import BrandCategory from "../_components/filter-sidebar/BrandCategory";
import dynamic from "next/dynamic";

const PriceCategory = dynamic(
    () => import("../_components/filter-sidebar/PriceCategory"),
    {
        ssr: true,
    },
);

interface ShopCategoryItem {
    title: string;
    filterKey: FilterTypes;
    Component: React.ComponentType;
}

export const dataShopCategory: ShopCategoryItem[] = [
    {
        title: "Product Categories",
        filterKey: "product",
        Component: ProductCategory,
    },
    {
        title: "Filter by Color",
        filterKey: "color",
        Component: ColorCategory,
    },

    {
        title: "Size",
        filterKey: "size",
        Component: SizeCategory,
    },
    {
        title: "Brand",
        filterKey: "brand",
        Component: BrandCategory,
    },
    {
        title: "Price",
        filterKey: "price",
        Component: PriceCategory,
    },
];
