import { memo } from "react";
import {
  Controller,
  useFormContext,
  useWatch,
  type ControllerRenderProps,
} from "react-hook-form";
import { Input } from "@/modules/common/components/shadcn/input";
import { usePaymentItemStore } from "../stores";
import { TRANSACTION_TYPES } from "../constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/common/components/shadcn/tooltip";

const CashInput = memo(function ({
  field,
  denomination,
}: {
  field: ControllerRenderProps;
  denomination: number;
}) {
  const { control, setValue } = useFormContext();
  const { selectedItem: index } = usePaymentItemStore();
  const subtotal = useWatch({
    control,
    name: `payments.${index}.subtotal`,
  });
  const transactionType = useWatch({
    control,
    name: `payments.${index}.transactionType`,
  });
  const total = useWatch({
    control,
    name: "total",
  });
  const isTransactionUndefined = transactionType === undefined;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Input
          {...field}
          disabled={isTransactionUndefined}
          onChange={(event) => {
            const billsValue =
              Number(event.target.value) * Number(denomination);
            const newTotal =
              transactionType === TRANSACTION_TYPES.IN
                ? total + billsValue
                : total - billsValue;
            field.onChange(Number(event.target.value));
            setValue(`payments.${index}.subtotal`, subtotal + billsValue);
            setValue("total", newTotal);
          }}
          type="number"
          min={0}
        />
      </TooltipTrigger>
      {isTransactionUndefined ? (
        <TooltipContent side={"right"}>
          Defina el tipo de transacción para editar
        </TooltipContent>
      ) : null}
    </Tooltip>
  );
});

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
        return <CashInput field={field} denomination={denomination} />;
      }}
    />
  );
});

export default CashAmountInput;
