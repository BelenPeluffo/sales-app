import {
  Field,
  FieldError,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { getCurrencySymbol } from "../utils";
import { Input } from "@/modules/common/components/shadcn/input";
import { usePaymentItemStore } from "../stores";
import { CASH_METHODS } from "../constants";
import type { PaymentItemType } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/common/components/shadcn/tooltip";

const MontoInput = ({ index }: Pick<PaymentItemType, "index">) => {
  const { control, setValue } = useFormContext();
  const { currency } = usePaymentItemStore();
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });
  const total = useWatch({
    control,
    name: "total",
  });
  const isMethodCash = paymentType && CASH_METHODS.includes(paymentType);
  const isMethodUndefined = !paymentType;
  const isMontoDisabled = isMethodUndefined || isMethodCash;

  return (
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
              <Tooltip>
                <TooltipTrigger>
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
                </TooltipTrigger>
                {isMethodUndefined ? (
                  <TooltipContent>
                    Defina un método de pago para editar
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </div>
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
