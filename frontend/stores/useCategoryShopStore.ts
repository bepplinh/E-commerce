import { create } from "zustand";

export type FilterTypes = "product" | "color" | "size" | "price" | "brand";

interface CategoryShopState {
    isOpen: Record<FilterTypes, boolean>;
    toggleFilter: (key: FilterTypes) => void;
}

const useCategoryShopStore = create<CategoryShopState>((set) => ({
    isOpen: {
        product: true,
        color: true,
        size: true,
        price: true,
        brand: true,
    },

    toggleFilter: (key: FilterTypes) =>
        set((state) => ({
            isOpen: { ...state.isOpen, [key]: !state.isOpen[key] },
        })),
}));

export default useCategoryShopStore;
