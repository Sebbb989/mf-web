import { create } from "zustand";
import IUser from "@/interfaces/interfaces";
import { set } from "react-hook-form";

type isLoggedIn = {
  isLoggedIn: boolean;
  confirmLogIn: () => void;
  denyLogIn: () => void;
};

type user = {
  user: any | null;
  setUser: (newUser: any | null) => void;
};

type institutes = {
  institutes: Array<any> | null;
  setInstitutes: (newInstitutes: Array<any>) => void;
};

export const useIsLoggedIn = create<isLoggedIn>((set) => ({
  isLoggedIn: false,
  confirmLogIn: () => set(() => ({ isLoggedIn: true })),
  denyLogIn: () => set(() => ({ isLoggedIn: false })),
}));

export const useUser = create<user>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
    dni: "",
    isEnrolled: false,
    enrollNumber: "",
  },
  setUser: (newUser) => set(() => ({ user: newUser })),
}));

export const useInstitutes = create<institutes>((set) => ({
  institutes: null,
  setInstitutes: (newInstitutes) => set(() => ({ institutes: newInstitutes })),
}));
