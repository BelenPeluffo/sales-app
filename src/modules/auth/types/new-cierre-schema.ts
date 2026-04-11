import { VALIDATION_MESSAGES } from "@/modules/common";
import * as zod from "zod";

const { REQUIRED_FIELD } = VALIDATION_MESSAGES;

export const newCierreSchema = zod.object({
  initialAmount: zod.number(REQUIRED_FIELD),
  exchangeRates: zod.object({
    dollars: zod.number(REQUIRED_FIELD),
    reais: zod.number(REQUIRED_FIELD),
  }),
});

export type NewCierre = zod.infer<typeof newCierreSchema>;
