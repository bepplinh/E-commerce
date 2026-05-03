import { create } from "zustand";
import User from "@/types/user";

type AuthStore = {
    user: User | null;
    isAuth: boolean;
    login: (user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
    setIsAuth: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuth: false,

    // Set cả user và isAuth trong 1 action — dùng sau khi login thành công
    login: (user: User) => set({ isAuth: true, user }),

    // Xóa toàn bộ auth state khi logout
    logout: () => set({ isAuth: false, user: null }),

    setUser: (user: User) => set({ user }),
    setIsAuth: () => set((state) => ({ isAuth: !state.isAuth })),
}));

export default useAuthStore;
