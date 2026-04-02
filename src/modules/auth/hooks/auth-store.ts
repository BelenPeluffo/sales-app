import { create } from "zustand";

const USER_ROLES = {
  ADMIN: 1,
  CASHIER: 2,
} as const;

type USER_ROLES = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface User {
  name: string;
  lastname: string;
  id: number;
  role: USER_ROLES;
}

export interface UserStore {
    user: User | null,
    setUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({user: user})
}))