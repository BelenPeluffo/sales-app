import { useFormContext, useWatch } from "react-hook-form";
import { CASH_METHODS } from "../constants";
import { CashBreakdownTable } from "../components";
import { usePaymentItemStore } from "../stores";

const CreateMovimientoDisplay = () => {
  const { control } = useFormContext();
  const { selectedItem } = usePaymentItemStore();
  const paymentType = useWatch({
    control,
    name: `payments.${selectedItem}.method`,
  });

  return selectedItem !== null ? (
    <div>
      {CASH_METHODS.includes(paymentType) ? <CashBreakdownTable /> : null}
    </div>
  ) : null;
};

export default CreateMovimientoDisplay;
