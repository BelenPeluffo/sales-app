import { createColumnHelper } from "@tanstack/react-table";
import type { CashBreakdown } from "../types";
import { CURRENCIES } from "../constants";

export interface CashBreakdownTable extends CashBreakdown {
  subtotal: number;
}

export const cashBreakdownColumnHelper =
  createColumnHelper<CashBreakdownTable>();

export const getFormatedBillDisplay = (bill: number) => {
  const isBillAThousand = bill / 1000 >= 1;
  if (isBillAThousand) return `${bill / 1000}.000`;
  return bill;
};

export const getCurrencySymbol = (currency: CURRENCIES) => {
  switch (currency) {
    case CURRENCIES.DOLLARS:
      return "US$";
    case CURRENCIES.REAIS:
      return "R$";
    case CURRENCIES.PESOS_AR:
    default:
      return "AR$";
  }
};
