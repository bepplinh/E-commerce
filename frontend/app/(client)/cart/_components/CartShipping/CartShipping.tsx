import PaymentMethod from "./PaymentMethod";
import YourOrder from "./YourOrder";

function CartShipping() {
    return (
        <div>
            <YourOrder />
            <PaymentMethod />
        </div>
    );
}

export default CartShipping;
