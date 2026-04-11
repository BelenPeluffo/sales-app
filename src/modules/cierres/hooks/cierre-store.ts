import type { NewCierre } from "@/modules/auth";
import { create } from "zustand";

export const ABIERTO = "abierto";
export const CERRADO = "cerrado";

export type CierreState = typeof ABIERTO | typeof CERRADO;

export interface CierreStoreState extends NewCierre {
  state: CierreState;
  abrirCierre: (options: NewCierre) => void;
  cerrarCierre: () => void;
}

export const useCierreStore = create<CierreStoreState>((set) => ({
  state: CERRADO,
  initialAmount: 0,
  exchangeRates: { dollars: 0, reais: 0 },
  abrirCierre: ({ initialAmount, exchangeRates }) =>
    set({
      state: ABIERTO,
      initialAmount,
      exchangeRates,
    }),
  cerrarCierre: () => set({ state: CERRADO }),
}));
