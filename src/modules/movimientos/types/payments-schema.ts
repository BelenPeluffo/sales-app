import * as zod from "zod";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../constants";

const cashSchema = zod.object({
  bill: zod.number(),
  amount: zod.number(),
});

export const paymentItemSchema = zod
  .object({
    method: zod
      .enum(PAYMENT_METHODS)
      .optional()
      .refine((value) => value !== undefined && value !== null, {
        message: "Campo requerido",
      }),
    transactionType: zod.enum(TRANSACTION_TYPES).optional(),
    amount: zod
      .number()
      .transform((value) => (value ? Number(value) : 0))
      .nonoptional()
      .refine((value) => value > 0, { message: "Campo requerido" }),
    cashBreakdown: zod
      .object({
        dollars: zod.array(cashSchema).optional(),
        pesosAr: zod.array(cashSchema).optional(),
      })
      .optional(),
  })
  .superRefine((formValues, context) => {
    if (formValues.method === PAYMENT_METHODS.PESOS_AR) {
      if (!formValues.transactionType) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Campo requerido",
          path: ["transactionType"],
        });
      }
      if (formValues.cashBreakdown?.pesosAr?.length === 0) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Campo requerido",
        });
      }
    }
    if (formValues.method === PAYMENT_METHODS.DOLLARS) {
      if (formValues.cashBreakdown?.dollars?.length === 0) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          message: "Campo requerido",
        });
      }
    }
  });

export const paymentsSchema = zod.object({
  payments: zod.array(paymentItemSchema).min(1),
});

export type Payment = zod.infer<typeof paymentItemSchema>;
export type PaymentPartial = Partial<Payment>;
export type CashBreakdown = zod.infer<typeof cashSchema>;
