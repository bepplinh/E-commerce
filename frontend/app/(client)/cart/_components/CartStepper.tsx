import { dataStepper } from "../_constants/dataStepper";
import Step from "./Step";

export default function CartStepper() {
    return (
        <div className="flex">
            {dataStepper.map((item) => (
                <Step key={item.id} item={item} />
            ))}
        </div>
    );
}
