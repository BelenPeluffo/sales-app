import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/shadcn/dialog";
import { FieldGroup } from "@/modules/common/components/shadcn/field";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentsSchema, type Payment } from "../types";
import PaymentItem from "./payment-item";
import { Separator } from "@/modules/common/components/shadcn/separator";
import { Trash2 } from "lucide-react";

const MovimientoForm = () => {
  const { control, trigger, formState } = useForm<{
    payments: Array<Payment>;
  }>({
    defaultValues: {
      payments: [{ method: undefined, amount: 0 }],
    },
    resolver: zodResolver(paymentsSchema),
    mode: "onChange",
  });
  const {
    fields: payments,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "payments",
  });

  const appendItem = () => {
    trigger();
    console.log("formState.errors", formState.errors);
    if (!formState.errors.payments) append({ method: undefined, amount: 0 });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Ingresar movimiento</DialogTitle>
      </DialogHeader>
      <form action="">
        <FieldGroup>
          {payments.map((payment, index) => {
            return (
              <>
                <div className="flex flex-row gap-2">
                  <PaymentItem
                    item={payment}
                    index={index}
                    control={control}
                    key={payment.id}
                  />
                  {payments.length > 1 ? (
                    <button
                      className="text-green-300 hover:cursor-pointer hover:text-red-400 w-[10%]"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="justify-center" size={25} />
                    </button>
                  ) : (
                    <div className="w-[10%]"></div>
                  )}
                </div>
                <Separator />
              </>
            );
          })}
          <button
            className="hover:text-green-300 hover:decoration-green-300 hover:cursor-pointer hover:underline"
            onClick={appendItem}
            type="button"
          >
            + Agregar método de pago
          </button>
        </FieldGroup>
      </form>
      <DialogFooter>
        <button className="!border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
          Cancelar
        </button>
        <button className="border-black border-1 rounded w-[25%] hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300">
          Guardar
        </button>
      </DialogFooter>
    </>
  );
};

export default MovimientoForm;
