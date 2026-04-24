import Featured from "@/components/client/Featured";
import HotDeal from "@/components/client/HotDeal";
import YouMightLike from "@/components/client/YouMightLike";
import Banner from "@/components/client/Banner";

export default function HomeClient() {
    return (
        <div>
            <Banner />
            <YouMightLike />
            <HotDeal />
            <Featured />
        </div>
    );
}
