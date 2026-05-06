"use server";

import { CartItem } from "@/types/cart";

const API_URL = process.env.API_URL;

export async function addToCartAction(item: CartItem) {
    try {
        const result = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        return result.json();
    } catch (error) {
        console.log(error);
    }
}
