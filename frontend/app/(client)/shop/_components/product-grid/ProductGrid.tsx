import ProductCard from "./ProductCard";

interface ListProductProps {
    view: number;
}

import { products } from "../../_constants/products";

function ListProduct({ view }: ListProductProps) {
    const gridClass =
        view === 2 ? "grid-cols-2" : view === 3 ? "grid-cols-3" : "grid-cols-4";

    return (
        <div className={`mt-8 grid ${gridClass} gap-x-8 gap-y-12`}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ListProduct;
