import { createColumnHelper } from "@tanstack/react-table";
import type { CashBreakdown } from "../types";
import { TableHead } from "@/modules/common/components/shadcn/table";
import {
  CashAmountInput,
  CashDenominationCell,
  CashSubtotalCell,
} from "../components";

export interface CashBreakdownTable extends CashBreakdown {
  subtotal: number;
}

const cashBreakdownColumnHelper = createColumnHelper<CashBreakdownTable>();

export const CASH_BREAKDOWN_CONFIG = [
  cashBreakdownColumnHelper.display({
    id: "bill",
    header: () => <TableHead>Denominación</TableHead>,
    cell: ({ row }) => (
      <CashDenominationCell denomination={row.original.bill} />
    ),
  }),
  cashBreakdownColumnHelper.accessor("amount", {
    header: () => <TableHead>Cantidad</TableHead>,
    cell: ({ row }) => <CashAmountInput denomination={row.original.bill} />,
  }),
  cashBreakdownColumnHelper.display({
    id: "subtotal",
    header: () => <TableHead>Subtotal</TableHead>,
    cell: () => <CashSubtotalCell />,
  }),
];
