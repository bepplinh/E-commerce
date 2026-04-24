import { create } from "zustand";

interface AppStore {
    isSearch: boolean;
    setIsSearch: (isSearch: boolean) => void;
}

const useAppStore = create<AppStore>((set) => ({
    isSearch: false,
    setIsSearch: (isSearch: boolean) => set({ isSearch }),
}));

export default useAppStore;
