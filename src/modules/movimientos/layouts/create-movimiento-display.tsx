import { useFormContext, useWatch } from "react-hook-form";
import { CURRENCIES, PAYMENT_METHODS } from "../constants";
import { CashBreakdownTable } from "../components";
import { usePaymentItemStore } from "../stores";

const CreateMovimientoDisplay = () => {
  const { control } = useFormContext();
  const { selectedItem } = usePaymentItemStore();
  const paymentType = useWatch({
    control,
    name: `payments.${selectedItem}.method`,
  });
  console.log("selectedItem?", selectedItem);
  return selectedItem !== null ? (
    <div>
      {paymentType === PAYMENT_METHODS.PESOS_AR ? (
        <CashBreakdownTable
          index={selectedItem}
          currency={CURRENCIES.PESOS_AR}
        />
      ) : null}
      {paymentType === PAYMENT_METHODS.DOLLARS ? (
        <CashBreakdownTable
          index={selectedItem}
          currency={CURRENCIES.DOLLARS}
        />
      ) : null}
      {paymentType === PAYMENT_METHODS.REAIS ? (
        <CashBreakdownTable index={selectedItem} currency={CURRENCIES.REAIS} />
      ) : null}
    </div>
  ) : null;
};

export default CreateMovimientoDisplay;
