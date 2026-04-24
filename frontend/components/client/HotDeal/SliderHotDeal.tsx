import { dataCard } from "./dataCard";
import HotDealCard from "./HotDealCard";

export default function SliderHotDeal() {
  return (
    <div className="flex items-center justify-start gap-6 overflow-x-auto scrollbar-hide">
      {dataCard.map((cardItem) => (
        <HotDealCard key={cardItem.id} cardItem={cardItem} />
      ))}
    </div>
  );
}
