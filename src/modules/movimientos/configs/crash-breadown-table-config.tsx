import { createColumnHelper } from "@tanstack/react-table";
import type { CashBreakdown } from "../types";
import { TableHead } from "@/modules/common/components/shadcn/table";
import { getCurrencySymbol, getFormatedBillDisplay } from "../utils";
import { CashAmountInput } from "../components";
import type { CURRENCIES } from "../constants";

export interface CashBreakdownTable extends CashBreakdown {
  subtotal: number;
}

const cashBreakdownColumnHelper =
  createColumnHelper<CashBreakdownTable>();

export const getCashBreakdownTableConfig = ({
  index,
  currency,
}: {
  index: number;
  currency: CURRENCIES;
}) => [
  cashBreakdownColumnHelper.display({
    id: "bill",
    header: () => <TableHead>Denominación</TableHead>,
    cell: ({ row }) =>
      `${getCurrencySymbol(currency)} ${getFormatedBillDisplay(row.original.bill)}`,
  }),
  cashBreakdownColumnHelper.accessor("amount", {
    header: () => <TableHead>Cantidad</TableHead>,
    cell: ({ row }) => (
      <CashAmountInput
        index={index}
        currency={currency}
        denomination={row.original.bill}
      />
    ),
  }),
  cashBreakdownColumnHelper.display({
    id: "subtotal",
    header: () => <TableHead>Subtotal</TableHead>,
    cell: ({ row }) => {
      return `${getCurrencySymbol(currency)} ${getFormatedBillDisplay(row.original.amount * row.original.bill)}`;
    },
  }),
];
