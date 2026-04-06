import { memo } from "react";
import type { CURRENCIES } from "../constants";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/modules/common/components/shadcn/input";

const CashAmountInput = memo(function ({
  index,
  currency,
  denomination,
}: {
  index: number;
  currency: CURRENCIES;
  denomination: number;
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={`payments.${index}.cashBreakdown.${currency}.${denomination}.amount`}
      control={control}
      defaultValue={0}
      render={({ field }) => <Input {...field} type="number" min={0} />}
    />
  );
});

export default CashAmountInput;