import ProductCard from "./ProductCard";
import { getProducts } from "@/services/client/product.service";

import { Product } from "@/types/product";

interface ListProductProps {
    view: number;
    params: { [key: string]: string | string[] | undefined };
}

async function ListProduct({ view, params }: ListProductProps) {
    const data = await getProducts(params);

    const gridClass =
        view === 2 ? "grid-cols-2" : view === 3 ? "grid-cols-3" : "grid-cols-4";

    return (
        <div className={`mt-8 grid ${gridClass} gap-x-8 gap-y-12`}>
            {data?.products?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ListProduct;
