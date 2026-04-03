import { Field, FieldLabel } from "@/modules/common/components/shadcn/field";
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
  useWatch,
  type Control,
  type FieldArrayWithId,
} from "react-hook-form";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../constants";
import type { Payment } from "../types/payment";

// TODO: Implementar servicio para obtenerlos desde API & Crear file de constantes donde los IDs queden guardados*
/*
*CONSULTA: ¿Cuál es la mejor práctica con respecto a usar datos desde API para condicionar lógica en el FE?
- ¿Usar los IDs guardándolos en una store, por ejemplo?
- ¿O recurriendo a los strings?
Quizás guardarlos en store en caso de que se necesite saber su valor en más de un lugar.
*/
const paymentMethods = [
  { name: "Visa electrón", value: PAYMENT_METHODS.VISA_ELECTRON },
  { name: "Maestro", value: PAYMENT_METHODS.MAESTRO },
  { name: "US$ Dólares", value: PAYMENT_METHODS.DOLLARS },
  { name: "R Reales", value: PAYMENT_METHODS.REAIS },
  { name: "AR$ Pesos Argentinos", value: PAYMENT_METHODS.PESOS_AR },
];

const PaymentItem = ({
  item,
  index,
  control,
}: {
  item: FieldArrayWithId<
    {
      payments: Array<Payment>;
    },
    "payments",
    "id"
  >;
  index: number;
  control: Control<{ payments: Array<Payment> }>;
}) => {
  const paymentType = useWatch({
    control,
    name: `payments.${index}.method`,
  });
  {
    JSON.stringify(paymentType);
  }

  console.log("item", item);
  return (
    <>
      <Controller
        name={`payments.${index}.method`}
        control={control}
        render={({ field }) => {
          console.log("FIELD > value", field.value);
          console.log("FIELD > name", field.name);
          return (
            <Field>
              <FieldLabel>Método de pago</FieldLabel>
              <Select
                // {...field}
                name={field.name}
                value={field.value?.toString()}
                key={item.id}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Método de pago</SelectLabel>
                    {paymentMethods.map((method) => (
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
            </Field>
          );
        }}
      />
      {paymentType === PAYMENT_METHODS.PESOS_AR ? (
        <Controller
          name={`payments.${index}.transactionType`}
          control={control}
          render={({ field }) => {
            return (
              <Field>
                <FieldLabel>Tipo de transacción</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value?.toString()}
                  key={item.id}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
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
              </Field>
            );
          }}
        />
      ) : null}
    </>
  );
};

export default PaymentItem;
