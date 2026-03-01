import { create } from "zustand";

export const ABIERTO = "abierto";
export const CERRADO = "cerrado";

export type CierreState = typeof ABIERTO | typeof CERRADO;

export interface CierreStoreState {
  state: CierreState;
  abrirCierre: () => void;
  cerrarCierre: () => void;
}

export const useCierreStore = create<CierreStoreState>((set) => ({
  state: CERRADO,
  abrirCierre: () => set({ state: ABIERTO }),
  cerrarCierre: () => set({ state: CERRADO }),
}));
