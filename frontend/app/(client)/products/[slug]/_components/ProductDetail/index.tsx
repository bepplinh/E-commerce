import Breadcrumb from "./Breadcrumb";
import StarRating from "./StarRating";
import ProductActions from "./ProductActions";
import ProductMetadata from "./ProductMetadata";
import QuantityActions from "./QuantityActions";

export default function ProductDetail() {
    return (
        <div className="px-5">
            <Breadcrumb />

            <h1 className="text-[26px] font-medium leading-tight mb-4 text-gray-900">
                Lightweight Puffer Jacket With a Hood
            </h1>

            <StarRating rating={5} reviews="8k+" />

            <div className="text-[24px] font-medium mb-8 text-gray-900">
                $449
            </div>

            <p className="text-gray-600 leading-relaxed max-w-xl mb-12">
                Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                elementum gravida nec dui. Aenean aliquam varius ipsum, non
                ultricies tellus sodales eu. Donec dignissim viverra nunc, ut
                aliquet magna posuere eget.
            </p>

            <QuantityActions />

            <ProductActions />

            <ProductMetadata
                sku="N/A"
                categories={["Casual & Urban Wear", "Jackets", "Men"]}
                tags={["biker", "black", "bomber", "leather"]}
            />
        </div>
    );
}
