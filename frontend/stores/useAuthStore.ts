import { create } from "zustand";

type AuthStore = {
    isAuth: boolean;
    setIsAuth: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    isAuth: false,
    setIsAuth: () => set((state) => ({ isAuth: !state.isAuth })),
}));

export default useAuthStore;
