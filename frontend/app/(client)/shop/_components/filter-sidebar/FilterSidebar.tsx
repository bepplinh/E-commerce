import { getFilter } from "@/services/client/product.service";

import dynamic from "next/dynamic";

import ProductCategory from "./ProductCategory";
import ColorCategory from "./ColorCategory";
import SizeCategory from "./SizeCategory";
import BrandCategory from "./BrandCategory";
import FilterAccordion from "./FilterAccordion";

const PriceCategory = dynamic(() => import("./PriceCategory"));

async function FilterSidebar() {
    const filterData = await getFilter();

    return (
        <div className="sticky top-10 h-fit max-h-[calc(100vh-40px)] overflow-y-auto scrollbar-hide space-y-6 pb-10">
            <FilterAccordion title="Product Categories" filterKey="product">
                <ProductCategory data={filterData.categories} />
            </FilterAccordion>

            <FilterAccordion title="Filter by Color" filterKey="color">
                <ColorCategory data={filterData.colors} />
            </FilterAccordion>

            <FilterAccordion title="Size" filterKey="size">
                <SizeCategory data={filterData.sizes} />
            </FilterAccordion>

            <FilterAccordion title="Brand" filterKey="brand">
                <BrandCategory data={filterData.brands} />
            </FilterAccordion>

            <FilterAccordion title="Price" filterKey="price">
                <PriceCategory />
            </FilterAccordion>
        </div>
    );
}

export default FilterSidebar;
