import { Textarea } from "@/modules/common/components/shadcn/textarea";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel } from "@/modules/common/components/shadcn/field";
import { usePaymentItemStore } from "../stores";

const PaymentItemDetail = () => {
  const { control } = useFormContext();
  const { selectedItem: index } = usePaymentItemStore();

  return index !== undefined ? (
    <Controller
      name={`payments.${index}.details`}
      {...{ control }}
      render={({ field }) => {
        return (
          <Field>
            <FieldLabel>Detalles de pago</FieldLabel>
            <Textarea
              {...field}
              placeholder="Detalles respecto al método de pago"
            />
          </Field>
        );
      }}
    />
  ) : null;
};

export default PaymentItemDetail;
