import { useFormContext, useWatch } from "react-hook-form";
import type { Payment } from "../types";
import { TRANSACTION_TYPES } from "../constants";

const MovimientoTotal = () => {
  const { control } = useFormContext();
  const grandTotal: number = useWatch({
    control,
    name: `total`,
  });
  const payments: Array<Payment> = useWatch({
    control,
    name: "payments",
  });
  const { ingresos, egresos } = payments.reduce(
    (total, payment) => {
      if (
        payment.transactionType === undefined ||
        payment.transactionType === TRANSACTION_TYPES.IN
      )
        return { ...total, ingresos: total.ingresos + payment.subtotal };
      return { ...total, egresos: total.egresos + payment.subtotal };
    },
    { ingresos: 0, egresos: 0 },
  );
  return (
    <div className="flex flex-col justify-center content-center text-center w-full">
      <p>Ingresos: {ingresos}</p>
      <p>Egresos: {egresos} </p>
      <p>Total: {grandTotal}</p>
    </div>
  );
};

export default MovimientoTotal;
