import { BaseProduct } from "./base";

export interface CartItem extends BaseProduct {
    color: string;
    size: string;
    quantity: number;
}
