import { useCierreStore } from "@/modules/cierres/hooks/cierre-store";
import { useUserStore } from "../hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/common/components/shadcn/dialog";
import { useState } from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import { Input } from "@/modules/common/components/shadcn/input";

const NoSession = () => {
  const { setUser } = useUserStore();
  const { abrirCierre } = useCierreStore();
  const [openDialog, setOpenDialog] = useState(false);

  const logout = () => {
    setUser(null);
  };

  const initSession = () => {
    abrirCierre();
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-row w-[60%] gap-1">
      <button
        className="!border-black border-1 w-[50%] rounded hover:cursor-pointer hover:bg-green-300"
        onClick={logout}
      >
        Cerrar sesión
      </button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger>
          <button
            className="border-black border-1 w-full rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300"
            onClick={() => setOpenDialog(true)}
          >
            Abrir caja
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir cierre</DialogTitle>
          </DialogHeader>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="monto-inicial">Monto inicial</FieldLabel>
                <Input id="monto-inicial" type="number" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="us-dollars">Cotización Dolares</FieldLabel>
                <Input id="us-dollars" type="number" />
              </Field>
              <Field>
                <FieldLabel htmlFor="reais">Cotización Reales</FieldLabel>
                <Input id="reais" type="number" />
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
              onClick={initSession}
            >
              Ingresar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoSession;
