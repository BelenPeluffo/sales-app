import { createColumnHelper } from "@tanstack/react-table";
import type { CashBreakdown } from "../types";
import { Input } from "@/modules/common/components/shadcn/input";
import { TableHead } from "@/modules/common/components/shadcn/table";

export interface CashBreakdownTable extends CashBreakdown {
  subtotal: number;
}

const columnHelper = createColumnHelper<CashBreakdownTable>();

const getFormatedBillDisplay = (bill: number) => {
  const isBillAThousand = bill / 1000 >= 1;
  if (isBillAThousand) return `${bill / 1000}.000`;
  return bill;
};

export const CASH_BREAKDOWN_CONFIG = [
  columnHelper.display({
    id: "bill",
    header: () => <TableHead>Denominación</TableHead>,
    cell: ({ row }) => `AR$ ${getFormatedBillDisplay(row.original.bill)}`,
  }),
  columnHelper.accessor("amount", {
    header: () => <TableHead>Cantidad</TableHead>,
    cell: ({ row }) => <Input type="number" min={0} key={row.id} />,
  }),
  columnHelper.display({
    id: "subtotal",
    header: () => <TableHead>Subtotal</TableHead>,
    cell: ({ row }) => {
      return `AR$ ${getFormatedBillDisplay(row.original.amount * row.original.bill)}`;
    },
  }),
];
