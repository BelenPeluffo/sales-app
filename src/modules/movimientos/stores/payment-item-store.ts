import { create } from "zustand";
import { CURRENCIES } from "../constants";

export interface PaymentItemState {
  selectedItem: number | null;
  currency?: CURRENCIES;
  setCurrency: (currency: CURRENCIES) => void;
  selectItem: (id: number) => void;
  reset: () => void;
}

export const usePaymentItemStore = create<PaymentItemState>((set) => ({
  selectedItem: null,
  currency: undefined,
  selectItem: (id) => set({ selectedItem: id }),
  setCurrency: (currency) => set({ currency }),
  reset: () => set({ selectedItem: null }),
}));
