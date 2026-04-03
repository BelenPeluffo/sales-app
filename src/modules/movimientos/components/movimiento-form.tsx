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

const MovimientoForm = () => {
  const { control } = useForm<{
    payments: Array<Payment>;
  }>({
    defaultValues: {
      payments: [{ method: undefined, amount: 0 }],
    },
    resolver: zodResolver(paymentsSchema),
  });
  const {
    fields: payments,
    append,
    // remove,
  } = useFieldArray({
    control,
    name: "payments",
  });

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
                <PaymentItem
                  item={payment}
                  index={index}
                  control={control}
                  key={payment.id}
                />
                <Separator />
              </>
            );
          })}
          <button
            className="hover:text-green-300 hover:decoration-green-300 hover:cursor-pointer hover:underline"
            onClick={() => append({ method: undefined, amount: 0 })}
            type="button"
          >
            + Agregar método de pago
          </button>
        </FieldGroup>
      </form>
      <DialogFooter></DialogFooter>
    </>
  );
};

export default MovimientoForm;
