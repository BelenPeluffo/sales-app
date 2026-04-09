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
import {
  Controller,
  useFormContext,
  useWatch,
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form";
import {
  CASH_METHODS,
  CURRENCIES,
  PAYMENT_METHODS,
  TRANSACTION_TYPES,
} from "../constants";
import { Input } from "@/modules/common/components/shadcn/input";
import { usePaymentItemStore } from "../stores";
import { getCurrencySymbol, getCurrencyTotal } from "../utils";
import "../styles/payment-item.css";

// TODO: Implementar servicio para obtenerlos desde API & Crear file de constantes donde los IDs queden guardados*
/*
*CONSULTA: ¿Cuál es la mejor práctica con respecto a usar datos desde API para condicionar lógica en el FE?
- ¿Usar los IDs guardándolos en una store, por ejemplo?
- ¿O recurriendo a los strings?
Quizás guardarlos en store en caso de que se necesite saber su valor en más de un lugar.
*/
const MOCK_PAYMENT_METHODS = [
  { name: "Visa electrón", value: PAYMENT_METHODS.VISA_ELECTRON },
  { name: "Maestro", value: PAYMENT_METHODS.MAESTRO },
  { name: "US$ Dólares", value: PAYMENT_METHODS.DOLLARS },
  { name: "R Reales", value: PAYMENT_METHODS.REAIS },
  { name: "AR$ Pesos Argentinos", value: PAYMENT_METHODS.PESOS_AR },
];

const PaymentItem = ({
  item,
  index,
}: {
  item: Record<"id", string>;
  index: number;
}) => {
  const { control } = useFormContext();
  const { selectItem, setCurrency, currency } = usePaymentItemStore();
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });
  const currencyState = useWatch({
    control,
    name: `payments.${index}.cashBreakdown.${currency}`,
  });
  const currencyTotal = getCurrencyTotal({ currencyState, currency });
  const isMontoDisabled = paymentType && CASH_METHODS.includes(paymentType);

  const selectPaymentMethod = (
    value: string,
    field: ControllerRenderProps<FieldValues, `payments.${number}.method`>,
  ) => {
    setCurrency(value as CURRENCIES);
    field.onChange(Number(value));
  };

  return (
    <div
      className="flex flex-col gap-2"
      onClickCapture={() => {
        selectItem(index);
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        <Controller
          name={`payments.${index}.method`}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Field className="w-[60%]" data-invalid={fieldState.invalid}>
                <FieldLabel>Método de pago</FieldLabel>
                <Select
                  {...field}
                  value={field.value?.toString()}
                  key={item.id}
                  onValueChange={(value) => selectPaymentMethod(value, field)}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    onPointerDownCapture={() => selectItem(index)}
                  >
                    <SelectValue placeholder="Seleccione método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Método de pago</SelectLabel>
                      {MOCK_PAYMENT_METHODS.map((method) => (
                        <SelectItem
                          value={method.value?.toString()}
                          key={method.value}
                        >
                          {method.name}
                        </SelectItem>
                      ))}
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
        <Controller
          name={`payments.${index}.amount`}
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
                    value={isMontoDisabled ? currencyTotal : field.value}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
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
