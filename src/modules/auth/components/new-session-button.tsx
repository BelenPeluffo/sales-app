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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import { useNavigate } from "react-router-dom";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { newCierreSchema, type NewCierre } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoneyInput } from "@/modules/common";

const NewSessionButton = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<NewCierre>({
    resolver: zodResolver(newCierreSchema),
    mode: "onChange",
  });
  const { setUser } = useUserStore();
  const { abrirCierre } = useCierreStore();
  const [openDialog, setOpenDialog] = useState(false);

  const logout = () => {
    // TODO: implementar request a servicio de logout
    setUser(null);
  };

  const initSession: SubmitHandler<NewCierre> = (data) => {
    // TODO: implementar request a servicio de creación de cierre
    console.log("initSession FORM DATA", data);
    abrirCierre(data);
    setOpenDialog(false);
    navigate("/session");
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
          <form onSubmit={handleSubmit(initSession)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="monto-inicial">Monto inicial</FieldLabel>
                <Controller
                  name="initialAmount"
                  {...{ control }}
                  render={({ field, fieldState }) => (
                    <>
                      <MoneyInput
                        {...field}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                        id="monto-inicial"
                        type="number"
                        min={0}
                        aria-invalid={fieldState.invalid}
                        placeholder="¿Con cuántos pesos se abre la caja hoy?"
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
                <FieldLabel htmlFor="us-dollars">Cotización USD</FieldLabel>
                <Controller
                  name="exchangeRates.dollars"
                  {...{ control }}
                  render={({ field, fieldState }) => (
                    <>
                      <MoneyInput
                        {...field}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                        id="us-dollars"
                        type="number"
                        aria-invalid={fieldState.invalid}
                        placeholder="¿A cuántos pesos equivale un dólar hoy?"
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
                <FieldLabel htmlFor="reais">Cotización reales</FieldLabel>
                <Controller
                  name="exchangeRates.reais"
                  {...{ control }}
                  render={({ field, fieldState }) => (
                    <>
                      <MoneyInput
                        {...field}
                        onChange={(event) =>
                          field.onChange(Number(event.target.value))
                        }
                        id="reais"
                        type="number"
                        aria-invalid={fieldState.invalid}
                        placeholder="¿A cuántos pesos equivale un real hoy?"
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
                <button
                  className="!border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300"
                  onClick={() => reset()}
                >
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
    </div>
  );
};

export default NewSessionButton;
