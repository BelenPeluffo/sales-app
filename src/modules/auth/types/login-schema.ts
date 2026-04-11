import * as zod from "zod";

export const loginSchema = zod.object({
  username: zod.string("Campo requerido"),
  password: zod.string("Campo requerido"),
});

export type LoginForm = zod.infer<typeof loginSchema>;
