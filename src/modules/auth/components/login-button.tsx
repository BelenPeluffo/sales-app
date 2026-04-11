import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/common/components/shadcn/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import { Input } from "@/modules/common/components/shadcn/input";
import { useUserStore } from "../hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../types";

const LoginButton = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const { setUser } = useUserStore();
  const [openDialog, setOpenDialog] = useState(false);

  const login: SubmitHandler<LoginForm> = (data) => {
    // TODO: intercambiar por login con API
    console.log("login FORM DATA", data);
    setUser({ name: "Belén", lastname: "Peluffo", role: 2, id: 1 });
    setOpenDialog(false);
    navigate("/no-session");
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <button className="border-black border-1 rounded w-full hover:cursor-pointer hover:bg-green-300">
          Abrir sesión
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Iniciar sesión</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(login)}>
          {/* TODO: implementar formulario con react-query y validaciones con zod */}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User</FieldLabel>
              <Controller
                name="username"
                {...{ control }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Ingrese user"
                      // required
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid ? (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-end"
                      />
                    ) : null}
                  </>
                )}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Controller
                name="password"
                {...{ control }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Ingrese su constraseña"
                      type="password"
                      // required
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid ? (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-end"
                      />
                    ) : null}
                  </>
                )}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <button className="!border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
                Cancelar
              </button>
            </DialogClose>
            <button
              className="border-black border-1 rounded w-[25%] hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300"
              type="submit"
            >
              Ingresar
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
