import { create } from "zustand";

export const ABIERTO = "abierto";
export const CERRADO = "cerrado";

export type CierreState = typeof ABIERTO | typeof CERRADO;

export interface CierreStoreState {
  state: CierreState;
  initialAmount: number;
  dolarExchangeRate: number;
  reaisExchangeRate: number;
  abrirCierre: (options: {
    initialAmount: number;
    dolarExchangeRate: number;
    reaisExchangeRate: number;
  }) => void;
  cerrarCierre: () => void;
}

export const useCierreStore = create<CierreStoreState>((set) => ({
  state: CERRADO,
  initialAmount: 0,
  dolarExchangeRate: 0,
  reaisExchangeRate: 0,
  abrirCierre: ({ initialAmount, dolarExchangeRate, reaisExchangeRate }) =>
    set({
      state: ABIERTO,
      initialAmount,
      dolarExchangeRate,
      reaisExchangeRate,
    }),
  cerrarCierre: () => set({ state: CERRADO }),
}));
