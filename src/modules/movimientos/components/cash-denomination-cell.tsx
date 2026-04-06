import { usePaymentItemStore } from "../stores";
import { getCurrencySymbol, getFormatedBillDisplay } from "../utils";

const CashDenominationCell = ({ denomination }: { denomination: number }) => {
  const { currency } = usePaymentItemStore();
  return currency ? `${getCurrencySymbol(currency)} ${getFormatedBillDisplay(denomination)}` : null;
};

export default CashDenominationCell;
