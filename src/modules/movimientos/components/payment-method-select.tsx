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
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form";
import { PAYMENT_METHODS, type CURRENCIES } from "../constants";
import { usePaymentItemStore } from "../stores";
import type { PaymentItem } from "../types";

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

const PaymentMethodSelect = ({ item, index }: PaymentItem) => {
  const { control } = useFormContext();
  const { selectItem, setCurrency } = usePaymentItemStore();

  const selectPaymentMethod = (
    value: string,
    field: ControllerRenderProps<FieldValues, `payments.${number}.method`>,
  ) => {
    setCurrency(value as CURRENCIES);
    field.onChange(Number(value));
  };

  return (
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
              <FieldError errors={[fieldState.error]} className="text-end" />
            ) : null}
          </Field>
        );
      }}
    />
  );
};

export default PaymentMethodSelect;
