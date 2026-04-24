import FeaturedProductCard from "./FeaturedProductCard";
import { dataFeaturedProduct } from "./dataFeaturedProduct";

export default function Featured() {
    return (
        <section className="py-6 md:py-10">
            <div className="w-full max-w-[1440px] mx-auto px-5">
                <h2 className="text-4xl text-black font-medium text-center pb-4 mb-6 md:mb-10">
                    Featured Products
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-10">
                    {dataFeaturedProduct.map((item) => (
                        <FeaturedProductCard key={item.id} cardItem={item} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <span className="uppercase inline-block cursor-pointer underline-expand [--underline-start-width:80%]">
                        load more
                    </span>
                </div>
            </div>
        </section>
    );
}
