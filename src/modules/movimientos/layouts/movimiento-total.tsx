import { useFormContext, useWatch } from "react-hook-form";
import type { Payment } from "../types";

const MovimientoTotal = () => {
  const { control } = useFormContext();
  const payments = useWatch({
    control,
    name: `payments`,
  });
  const grandTotal = payments.reduce((total: number, payment: Payment) => {
    return total + payment.subtotal;
  }, 0);
  return <div>Total: {grandTotal}</div>;
};

export default MovimientoTotal;
