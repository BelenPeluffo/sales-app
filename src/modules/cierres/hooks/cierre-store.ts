import type { NewCierre } from "@/modules/auth";
import { PAYMENT_METHODS } from "@/modules/movimientos/constants";
import { create } from "zustand";

export const ABIERTO = "abierto";
export const CERRADO = "cerrado";

export type CierreState = typeof ABIERTO | typeof CERRADO;

export interface CierreStoreState extends NewCierre {
  state: CierreState;
  // TODO: adaptar a estructura de datos que vendrá de API
  totalIncome: number;
  totalExpense: number;
  grandTotal: number;
  abrirCierre: (options: NewCierre) => void;
  cerrarCierre: () => void;
  setTotals: ({
    income,
    expense,
    grandTotal,
  }: {
    income: number;
    expense: number;
    grandTotal: number;
  }) => void;
  getCurrencyConversion: (
    amount: number,
    currency: PAYMENT_METHODS,
  ) => number | undefined;
}

export const useCierreStore = create<CierreStoreState>((set, get) => ({
  state: CERRADO,
  initialAmount: 0,
  exchangeRates: { dollars: 0, reais: 0 },
  totalIncome: 0,
  totalExpense: 0,
  grandTotal: 0,
  abrirCierre: ({ initialAmount, exchangeRates }) =>
    set({
      state: ABIERTO,
      initialAmount,
      exchangeRates,
    }),
  cerrarCierre: () => set({ state: CERRADO }),
  setTotals: (totals) => set({ ...totals }),
  getCurrencyConversion: (amount: number, currency: PAYMENT_METHODS) => {
    const { exchangeRates } = get();
    if (currency === PAYMENT_METHODS.DOLLARS)
      return amount * exchangeRates.dollars;
    if (currency === PAYMENT_METHODS.REAIS) return amount * exchangeRates.reais;
  },
}));
