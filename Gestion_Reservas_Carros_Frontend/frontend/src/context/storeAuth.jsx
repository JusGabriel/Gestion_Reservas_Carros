// src/context/storeAuth.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeAuth = create(
  persist(
    (set) => ({
      token: null,
      id: null,
      userName: null,
      rol: null, // opcional, si quieres manejar el rol

      setToken: (token) => set({ token }),
      setId: (id) => set({ id }),
      setUserName: (userName) => set({ userName }),
      setRol: (rol) => set({ rol }),

      clearToken: () => set({ token: null, id: null, userName: null, rol: null }),
    }),
    { name: "auth-token" } // persistirá en localStorage automáticamente
  )
);

export default storeAuth;
