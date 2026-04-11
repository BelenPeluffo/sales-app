import { VALIDATION_MESSAGES } from "@/modules/common";
import * as zod from "zod";

const { REQUIRED_FIELD } = VALIDATION_MESSAGES;

export const loginSchema = zod.object({
  username: zod.string(REQUIRED_FIELD),
  password: zod.string(REQUIRED_FIELD),
});

export type LoginForm = zod.infer<typeof loginSchema>;
