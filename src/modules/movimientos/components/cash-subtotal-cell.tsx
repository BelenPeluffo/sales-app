import { useFormContext, useWatch } from "react-hook-form";
import { getCurrencySymbol, getFormatedBillDisplay } from "../utils";
import { usePaymentItemStore } from "../stores";

const CashSubtotalCell = () => {
  const { control } = useFormContext();
  const { currency, selectedItem: index } = usePaymentItemStore();
  const billAmount = useWatch({
    control,
    name: `payments.${index}.amount`,
  });
  const denomination = useWatch({
    control,
    name: `payments.${index}.bill`,
  });
  console.log("billAmount", billAmount);
  console.log("denomination", denomination);
  return currency
    ? `${getCurrencySymbol(currency)} ${getFormatedBillDisplay(billAmount * denomination)}`
    : null;
};

export default CashSubtotalCell;
