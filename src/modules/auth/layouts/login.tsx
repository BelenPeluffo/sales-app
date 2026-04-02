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
  FieldGroup,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import { Input } from "@/modules/common/components/shadcn/input";
import { useUserStore } from "../hooks";
import { useState } from "react";

const Login = () => {
  const { setUser } = useUserStore();
  const [openDialog, setOpenDialog] = useState(false);

  const login = () => {
    // TODO: intercambiar por login con API
    setUser({ name: "Belén", lastname: "Peluffo", role: 2, id: 1 });
    setOpenDialog(false);
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
        <form action="">
          {/* TODO: implementar formulario con react-query y validaciones con zod */}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User</FieldLabel>
              <Input id="username" placeholder="Ingrese user" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                placeholder="Ingrese su constraseña"
                type="password"
                required
              />
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <button className="!border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
              Cancelar
            </button>
          </DialogClose>
          <button
            className="border-black border-1 rounded w-[25%] hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300"
            onClick={login}
          >
            Ingresar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
