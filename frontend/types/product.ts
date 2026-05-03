import { BaseProduct } from "./base";

export interface Product extends BaseProduct {
    category: string;
    rating: number;
    reviews: string;
    images: string[];
    colors: string[];
    sizes: string[];
    slug: string;
}
