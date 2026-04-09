import { useFormContext, useWatch } from "react-hook-form";

const MovimientoTotal = () => {
  const { control } = useFormContext();
  const grandTotal: number = useWatch({
    control,
    name: `total`,
  });
  return <div>Total: {grandTotal}</div>;
};

export default MovimientoTotal;
