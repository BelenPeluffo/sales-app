import { FieldGroup } from "@/modules/common/components/shadcn/field";
import { useFieldArray, useFormContext } from "react-hook-form";
import PaymentItem from "./payment-item";
import { Separator } from "@/modules/common/components/shadcn/separator";
import { Trash2 } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const MovimientoForm = () => {
  const { control } = useFormContext();
  const {
    fields: payments,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "payments",
  });
  payments.forEach((payment) => console.log("payment", payment));
  const appendItem = () => {
    // trigger();
    // console.log("formState.errors", formState.errors);
    // if (!formState.errors.payments) append({ method: undefined, amount: 0 });
    append({ method: undefined, amount: 0 });
    console.log("TRYING 2 APPEND");
  };

  return (
    <div className="w-[35%]">
      <p className="font-medium text-xl w-[25%]">Ingresar movimiento</p>
      <form action="">
        <FieldGroup>
          {payments.map((payment, index) => {
            return (
              <Fragment key={index}>
                <div className="flex flex-row gap-2">
                  <PaymentItem item={payment} index={index} key={payment.id} />
                  {payments.length > 1 ? (
                    <button
                      className="text-green-300 hover:cursor-pointer hover:text-red-400 w-[10%]"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="justify-center" size={25} />
                    </button>
                  ) : (
                    <div className="w-[10%]"></div>
                  )}
                </div>
                <Separator />
              </Fragment>
            );
          })}
          <button
            className="hover:text-green-300 hover:decoration-green-300 hover:cursor-pointer hover:underline"
            onClick={appendItem}
            type="button"
          >
            + Agregar método de pago
          </button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default MovimientoForm;
