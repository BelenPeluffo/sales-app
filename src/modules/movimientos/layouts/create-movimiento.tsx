import { useNavigate } from "react-router-dom";
import { MovimientoForm } from "../components";
import { FormProvider, useForm } from "react-hook-form";
import { paymentsSchema, type Payment } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateMovimientoDisplay from "./create-movimiento-display";
import { usePaymentItemStore } from "../stores";

const CreateMovimiento = () => {
  const navigate = useNavigate();
  const { reset } = usePaymentItemStore();
  const formMethods = useForm<{
    payments: Array<Payment>;
  }>({
    defaultValues: {
      payments: [{ method: undefined, amount: 0 }],
    },
    resolver: zodResolver(paymentsSchema),
    mode: "onChange",
  });

  const goBack = () => {
    reset();
    navigate("/session");
  };

  const saveMovimiento = () => {
    console.log("valores", formMethods.getValues());
  };

  return (
    <div className="w-full h-full">
      <FormProvider {...formMethods}>
        <div className="flex flex-row gap-2">
          <MovimientoForm />
          <CreateMovimientoDisplay />
        </div>
        <div className="flex flex-row justify-end gap-2 px-2 pb-2">
          <button
            className="border-black border-1 rounded hover:cursor-pointer hover:bg-green-300 px-5"
            onClick={goBack}
          >
            Cancelar
          </button>
          {/** TODO: vamos a tener que ver cómo hacemos para acceder al trigger del form desde acá. */}
          <button
            className="border-black border-1 rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300 px-5"
            onClick={saveMovimiento}
          >
            Guardar
          </button>
        </div>
      </FormProvider>
    </div>
  );
};

export default CreateMovimiento;
