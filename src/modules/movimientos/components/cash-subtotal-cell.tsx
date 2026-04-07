import { useFormContext, useWatch } from "react-hook-form";
import { getCurrencySymbol, getFormatedBillDisplay } from "../utils";
import { usePaymentItemStore } from "../stores";
import { useMemo } from "react";

const CashSubtotalCell = ({ denomination }: { denomination: number }) => {
  const { control } = useFormContext();
  const { currency, selectedItem: index } = usePaymentItemStore();
  const billAmount = useWatch({
    control,
    name: `payments.${index}.cashBreakdown.${currency}.${denomination}.amount`,
  });
  const subtotal = useMemo(() => {
    return currency
      ? `${getCurrencySymbol(currency)} ${getFormatedBillDisplay(billAmount * denomination)}`
      : null;
  }, [billAmount, denomination, currency]);

  return subtotal;
};

export default CashSubtotalCell;
