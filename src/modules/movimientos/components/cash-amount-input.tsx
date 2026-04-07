import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/modules/common/components/shadcn/input";
import { usePaymentItemStore } from "../stores";

const CashAmountInput = memo(function ({
  denomination,
}: {
  denomination: number;
}) {
  const { control } = useFormContext();
  const { currency, selectedItem: index } = usePaymentItemStore();

  return (
    <Controller
      name={`payments.${index}.cashBreakdown.${currency}.${denomination}.amount`}
      control={control}
      defaultValue={0}
      render={({ field }) => {
        return (
          <Input
            {...field}
            onChange={(event) => field.onChange(Number(event.target.value))}
            type="number"
            min={0}
          />
        );
      }}
    />
  );
});

export default CashAmountInput;
