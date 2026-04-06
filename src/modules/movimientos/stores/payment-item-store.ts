import { create } from "zustand";

export interface PaymentItemState {
  selectedItem: number | null;
  selectItem: (id: number) => void;
  reset: () => void;
}

export const usePaymentItemStore = create<PaymentItemState>((set) => ({
  selectedItem: null,
  selectItem: (id) => set({ selectedItem: id }),
  reset: () => set({ selectedItem: null }),
}));
