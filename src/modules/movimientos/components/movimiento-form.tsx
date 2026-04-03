import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/modules/common/components/shadcn/dialog";
import { FieldGroup } from "@/modules/common/components/shadcn/field";
import { useFieldArray, useForm } from "react-hook-form";
import type { Payment } from "../types";
import PaymentItem from "./payment-item";

const MovimientoForm = () => {
  const { control } = useForm<{
    payments: Array<Payment>;
  }>({
    defaultValues: {
      payments: [{ method: null, amount: 0 }],
    },
  });
  const {
    fields: payments,
    // append,
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
              <PaymentItem
                item={payment}
                index={index}
                control={control}
                key={payment.id}
              />
            );
          })}
        </FieldGroup>
      </form>
      <DialogFooter></DialogFooter>
    </>
  );
};

export default MovimientoForm;
