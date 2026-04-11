import { createColumnHelper } from "@tanstack/react-table";
import { CurrencyTooltip } from "../components";

type Transaction = {
  time: string;
  amount: number;
  income: { amount: number; usesForeignCurrency?: boolean };
  expense?: { amount: number; usesForeignCurrency?: boolean };
  details?: string;
};

const pesosArFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const transactionTableHelper = createColumnHelper<Transaction>();

export const TRANSACTION_LIST_TABLE_CONFIG = [
  transactionTableHelper.display({
    id: "time",
    header: () => "Hora",
    cell: ({ row }) => row.original.time,
  }),
  transactionTableHelper.display({
    id: "income",
    header: () => "Ingreso",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        {pesosArFormat.format(row.original.income.amount)}
        {row.original.income.usesForeignCurrency ? <CurrencyTooltip /> : null}
      </div>
    ),
  }),
  transactionTableHelper.display({
    id: "expense",
    header: () => "Egreso",
    cell: ({ row }) =>
      row.original.expense ? (
        <div className="flex flex-row gap-2">
          {pesosArFormat.format(row.original.expense.amount)}
          {row.original.expense.usesForeignCurrency ? (
            <CurrencyTooltip />
          ) : null}
        </div>
      ) : (
        "-"
      ),
  }),
  transactionTableHelper.display({
    id: "amount",
    header: () => "Monto total",
    cell: ({ row }) => (
      <div className="flex flex-row gap-2">
        {pesosArFormat.format(row.original.amount)}
        {row.original.income.usesForeignCurrency ||
        row.original.expense?.usesForeignCurrency ? (
          <CurrencyTooltip />
        ) : null}
      </div>
    ),
  }),
  transactionTableHelper.display({
    id: "details",
    header: () => "Detalles",
    cell: ({ row }) => row.original.details ?? "-",
  }),
  transactionTableHelper.display({
    id: "actions",
    header: () => "Acciones",
    cell: ({ row }) => `Acciones ${row.id}`,
  }),
];
