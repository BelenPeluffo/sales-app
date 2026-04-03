import * as zod from "zod";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../constants";

export const paymentItemSchema = zod.object({
  method: zod
    .enum(PAYMENT_METHODS)
    .optional()
    .refine((value) => value !== undefined && value !== null, {
      message: "Campo requerido",
    }),
  transactionType: zod.enum(TRANSACTION_TYPES).optional(),
  amount: zod.number().nonoptional(),
});

export const paymentsSchema = zod.object({
  payments: zod.array(paymentItemSchema).min(1),
});

export type Payment = zod.infer<typeof paymentItemSchema>;
export type PaymentPartial = Partial<Payment>;
