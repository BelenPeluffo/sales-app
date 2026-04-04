import * as zod from "zod";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../constants";

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
      .nonoptional()
      .refine((value) => value > 0, { message: "Campo requerido" }),
  })
  .superRefine((formValues, context) => {
    if (
      formValues.method === PAYMENT_METHODS.PESOS_AR &&
      !formValues.transactionType
    ) {
      console.log('this is it, bitch');
      context.addIssue({
        code: zod.ZodIssueCode.custom,
        message: "Campo requerido",
        path: ["transactionType"]
      });
    }
  });

export const paymentsSchema = zod.object({
  payments: zod.array(paymentItemSchema).min(1),
});

export type Payment = zod.infer<typeof paymentItemSchema>;
export type PaymentPartial = Partial<Payment>;
