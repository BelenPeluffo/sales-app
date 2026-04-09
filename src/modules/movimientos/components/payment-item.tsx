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
import { Input } from "@/modules/common/components/shadcn/input";
import { usePaymentItemStore } from "../stores";
import { getCurrencySymbol } from "../utils";
import "../styles/payment-item.css";
import PaymentMethodSelect from "./payment-method-select";
import type { PaymentItem } from "../types";

const PaymentItem = ({ item, index }: PaymentItem) => {
  const { control, setValue } = useFormContext();
  const { selectItem, currency } = usePaymentItemStore();
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });
  const total = useWatch({
    control,
    name: "total",
  });
  const isMontoDisabled = paymentType && CASH_METHODS.includes(paymentType);

  return (
    <div
      className="flex flex-col gap-2"
      onClickCapture={() => {
        selectItem(index);
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        <PaymentMethodSelect {...{ item, index }} />
        <Controller
          name={`payments.${index}.subtotal`}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Field className="w-[40%]" data-invalid={fieldState.invalid}>
                <FieldLabel>Monto</FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    {currency ? getCurrencySymbol(currency) : "AR$"}
                  </span>
                  <Input
                    type="number"
                    className={currency || "pesosAr"}
                    {...field}
                    onChange={(event) => {
                      const subtotal = Number(event.target.value);
                      field.onChange(subtotal);
                      setValue("total", total + subtotal);
                    }}
                    min={0}
                    disabled={isMontoDisabled}
                    aria-invalid={fieldState.invalid}
                  />
                </div>
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
