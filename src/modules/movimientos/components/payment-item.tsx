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
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { CASH_METHODS, TRANSACTION_TYPES } from "../constants";
import { usePaymentItemStore } from "../stores";
import "../styles/payment-item.css";
import PaymentMethodSelect from "./payment-method-select";
import type { PaymentItemType } from "../types";
import MontoInput from "./monto-input";

const PaymentItem = ({ item, index }: PaymentItemType) => {
  const { control } = useFormContext();
  const { selectItem } = usePaymentItemStore();
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });

  return (
    <div
      className="flex flex-col gap-2"
      onClickCapture={() => {
        selectItem(index);
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        <PaymentMethodSelect {...{ item, index }} />
        <MontoInput {...{ index }} />
      </div>
      {CASH_METHODS.includes(paymentType) ? (
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
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-end"
                  />
                ) : null}
              </Field>
            );
          }}
        />
      ) : null}
    </div>
  );
};

export default PaymentItem;
