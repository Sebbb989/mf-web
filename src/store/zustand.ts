import { create } from "zustand";
import IUser from "@/interfaces/interfaces";

type isLoggedIn = {
  isLoggedIn: boolean;
  confirmLogIn: () => void;
  denyLogIn: () => void;
};

type user = {
  user: IUser | null;
  setUser: (newUser: IUser | null) => void;
};

export const useIsLoggedIn = create<isLoggedIn>((set) => ({
  isLoggedIn: false,
  confirmLogIn: () => set(() => ({ isLoggedIn: true })),
  denyLogIn: () => set(() => ({ isLoggedIn: false })),
}));

export const useUser = create<user>((set) => ({
  user: { name: "", email: "", dni: "" },
  setUser: (newUser) => set(() => ({ user: newUser })),
}));
