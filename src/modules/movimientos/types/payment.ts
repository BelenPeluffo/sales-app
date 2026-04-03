import type { PAYMENT_METHODS, TRANSACTION_TYPES } from "../constants";

export type Payment = {
  method: PAYMENT_METHODS | null;
  transactionType?: TRANSACTION_TYPES;
  amount: number;
};