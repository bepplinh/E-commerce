import ProductDetail from "./_components/ProductDetail";
import ProductImage from "./_components/ProductImages";
import ProductTabs from "./_components/ProductTabs";
import TabDescription from "./_components/ProductTabs/TabDescription";
import TabAdditionalInfo from "./_components/ProductTabs/TabAdditionalInfo";
import TabReviews from "./_components/ProductTabs/TabReviews";

export default function ProductDetailPage() {
    const tabs = [
        { label: "DESCRIPTION", content: <TabDescription /> },
        { label: "ADDITIONAL INFORMATION", content: <TabAdditionalInfo /> },
        { label: "REVIEWS (2)", content: <TabReviews /> },
    ];

    return (
        <div className="container mx-auto py-4 px-4 max-w-[1440px]">
            <div className="grid grid-cols-[3fr_2fr] gap-12">
                <ProductImage />
                <ProductDetail />
            </div>
            <ProductTabs tabs={tabs} />
        </div>
    );
}
