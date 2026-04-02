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

const Login = () => {
  return (
    <div className="flex flex-col flex-wrap gap-2 w-full h-full text-center justify-center content-center">
      <h1 className="font-medium text-5xl">Bienvenidx</h1>
      <Dialog>
        <DialogTrigger asChild>
          <button className="border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
            Abrir sesión
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Iniciar sesión</DialogTitle>
          </DialogHeader>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">User</FieldLabel>
                <Input id="username" placeholder="Ingrese user" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input id="password" placeholder="Ingrese su constraseña" type="password" required />
              </Field>
            </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <button className="!border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
                Cancelar
              </button>
            </DialogClose>
            <button className="border-black border-1 rounded w-[25%] hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300">
              Ingresar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
