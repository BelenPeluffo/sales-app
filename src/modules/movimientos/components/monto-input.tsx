import {
  Field,
  FieldError,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { usePaymentItemStore } from "../stores";
import { CASH_METHODS, PAYMENT_METHODS } from "../constants";
import type { PaymentItemType } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/common/components/shadcn/tooltip";
import { MoneyInput } from "@/modules/common";
import { useCierreStore } from "@/modules/cierres";
import { useCallback } from "react";

const MontoInput = ({ index }: Pick<PaymentItemType, "index">) => {
  const { control, setValue } = useFormContext();
  const { currency } = usePaymentItemStore();
  const { exchangeRates } = useCierreStore();
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });
  const total = useWatch({
    control,
    name: "total",
  });
  const isMethodCash = paymentType && CASH_METHODS.includes(paymentType);
  const isForeignCash =
    isMethodCash && paymentType !== PAYMENT_METHODS.PESOS_AR;
  const isMethodUndefined = !paymentType;
  const isMontoDisabled = isMethodUndefined || isMethodCash;

  const getCurrencyConversion = useCallback(
    (amount: number, currency: PAYMENT_METHODS) => {
      if (currency === PAYMENT_METHODS.DOLLARS)
        return amount * exchangeRates.dollars;
      if (currency === PAYMENT_METHODS.REAIS)
        return amount * exchangeRates.reais;
    },
    [exchangeRates],
  );

  return (
    <Controller
      name={`payments.${index}.subtotal`}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field className="w-[40%]" data-invalid={fieldState.invalid}>
            <FieldLabel>Monto</FieldLabel>
            <Tooltip>
              <TooltipTrigger>
                <MoneyInput
                  {...{ field }}
                  {...{ currency }}
                  disabled={isMontoDisabled}
                  onChange={(event) => {
                    const subtotal = Number(event.target.value);
                    field.onChange(subtotal);
                    setValue("total", total + subtotal);
                  }}
                  aria-invalid={fieldState.invalid}
                />
              </TooltipTrigger>
              {isMethodUndefined ? (
                <TooltipContent>
                  Defina un método de pago para editar
                </TooltipContent>
              ) : null}
              {isForeignCash && field.value > 0 ? (
                <TooltipContent>
                  Equivale a ARS $
                  {getCurrencyConversion(field.value, paymentType)} según
                  cotización del día de hoy (USD $1 = ARS $
                  {exchangeRates.dollars}).
                </TooltipContent>
              ) : null}
            </Tooltip>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} className="text-end" />
            ) : null}
          </Field>
        );
      }}
    />
  );
};

export default MontoInput;
