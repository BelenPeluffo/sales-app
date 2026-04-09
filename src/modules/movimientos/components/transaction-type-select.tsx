import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CASH_METHODS, TRANSACTION_TYPES } from "../constants";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/shadcn/select";
import type { PaymentItemType } from "../types";

const TransactionTypeSelect = ({ item, index }: PaymentItemType) => {
  const { control } = useFormContext();
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });
  return CASH_METHODS.includes(paymentType) ? (
    <Controller
      name={`payments.${index}.transactionType`}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Tipo de transacción</FieldLabel>
            <Select
              name={field.name}
              value={field.value?.toString()}
              key={item.id}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Seleccione tipo de transacción" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de transacción</SelectLabel>
                  <SelectItem value={TRANSACTION_TYPES.IN.toString()}>
                    Ingreso
                  </SelectItem>
                  <SelectItem value={TRANSACTION_TYPES.OUT.toString()}>
                    Egreso
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} className="text-end" />
            ) : null}
          </Field>
        );
      }}
    />
  ) : null;
};

export default TransactionTypeSelect;
