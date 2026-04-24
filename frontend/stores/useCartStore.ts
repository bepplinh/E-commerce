import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";

type CartStore = {
    step: number;
    items: CartItem[];
    modalAddress: boolean;

    setStep: (step: number) => void;
    setModalAddress: () => void;
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
};

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            step: 1,
            items: [],
            modalAddress: false,

            setStep: (step) => set({ step }),
            setModalAddress: () => {
                set((state) => ({ modalAddress: !state.modalAddress }));
            },

            addToCart: (product) => {
                const items = get().items;
                const itemExists = items.find((i) => i.id === product.id);

                let updatedItems;
                if (itemExists) {
                    updatedItems = items.map((i) =>
                        i.id === product.id
                            ? {
                                  ...i,
                                  quantity: i.quantity + 1,
                              }
                            : i,
                    );
                } else {
                    updatedItems = [...items, product];
                }

                set({ items: updatedItems });
            },
            removeFromCart: (productId) => {
                const items = get().items;
                const updatedItems = items.filter((i) => i.id !== productId);
                set({ items: updatedItems });
            },
            updateQuantity: (productId) => {
                const items = get().items;
                const updatedItems = items.map((i) =>
                    i.id === productId
                        ? {
                              ...i,
                              quantity: i.quantity + 1,
                          }
                        : i,
                );
                set({ items: updatedItems });
            },
            decreaseQuantity: (productId) => {
                const items = get().items;
                const updatedItems = items.map((i) =>
                    i.id === productId && i.quantity > 1
                        ? {
                              ...i,
                              quantity: i.quantity - 1,
                          }
                        : i,
                );
                set({ items: updatedItems });
            },
        }),
        {
            name: "cart-storage",
            partialize: (state) => ({ items: state.items }),
        },
    ),
);

export default useCartStore;
