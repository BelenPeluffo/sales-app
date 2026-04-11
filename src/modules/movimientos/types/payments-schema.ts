import * as zod from "zod";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../constants";
import { VALIDATION_MESSAGES } from "@/modules/common";

const cashSchema = zod.object({
  bill: zod.number(),
  amount: zod.number(),
});

export const paymentItemSchema = zod
  .object({
    method: zod.enum(PAYMENT_METHODS).optional(),
    transactionType: zod.enum(TRANSACTION_TYPES).optional(),
    subtotal: zod
      .number()
      .transform((value) => (value ? Number(value) : 0))
      .nonoptional(),
    cashBreakdown: zod
      .object({
        dollars: zod.array(cashSchema).optional(),
        pesosAr: zod.array(cashSchema).optional(),
        reais: zod.array(cashSchema).optional(),
      })
      .optional(),
    details: zod.string().optional(),
  })
  .superRefine((formValues, context) => {
    if (formValues.method === undefined || formValues.method === null) {
      context.addIssue({
        code: zod.ZodIssueCode.invalid_value,
        message: VALIDATION_MESSAGES.REQUIRED_FIELD,
        path: ["method"],
        values: [],
      });
    }
    if (formValues.subtotal <= 0) {
      context.addIssue({
        code: zod.ZodIssueCode.invalid_value,
        message: VALIDATION_MESSAGES.REQUIRED_FIELD,
        path: ["subtotal"],
        values: [],
      });
    }
    if (formValues.method === PAYMENT_METHODS.PESOS_AR) {
      if (!formValues.transactionType) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          message: VALIDATION_MESSAGES.REQUIRED_FIELD,
          path: ["transactionType"],
        });
      }
      if (formValues.cashBreakdown?.pesosAr?.length === 0) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          message: VALIDATION_MESSAGES.REQUIRED_FIELD,
        });
      }
    }
    if (formValues.method === PAYMENT_METHODS.DOLLARS) {
      if (formValues.cashBreakdown?.dollars?.length === 0) {
        context.addIssue({
          code: zod.ZodIssueCode.custom,
          message: VALIDATION_MESSAGES.REQUIRED_FIELD,
        });
      }
    }
  });

export const paymentsSchema = zod.object({
  payments: zod.array(paymentItemSchema).min(1),
  total: zod.number(),
});

export type Payment = zod.infer<typeof paymentItemSchema>;
export type Payments = zod.infer<typeof paymentsSchema>;
export type PaymentPartial = Partial<Payment>;
export type CashBreakdown = zod.infer<typeof cashSchema>;
