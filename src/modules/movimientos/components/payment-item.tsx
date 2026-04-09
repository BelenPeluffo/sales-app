import { usePaymentItemStore } from "../stores";
import "../styles/payment-item.css";
import PaymentMethodSelect from "./payment-method-select";
import type { PaymentItemType } from "../types";
import MontoInput from "./monto-input";
import TransactionTypeSelect from "./transaction-type-select";

const PaymentItem = ({ item, index }: PaymentItemType) => {
  const { selectItem } = usePaymentItemStore();

  return (
    <div
      className="flex flex-col gap-2"
      onClickCapture={() => {
        selectItem(index);
      }}
    >
      <div className="flex flex-row gap-2 w-full">
        <PaymentMethodSelect {...{ item, index }} />
        <MontoInput {...{ index }} />
      </div>
      <TransactionTypeSelect {...{ item, index }} />
    </div>
  );
};

export default PaymentItem;
