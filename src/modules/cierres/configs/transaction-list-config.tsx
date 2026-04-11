import { createColumnHelper } from "@tanstack/react-table";

type Transaction = {
  time: string;
  amount: number;
  details?: string;
};

const transactionTableHelper = createColumnHelper<Transaction>();

export const TRANSACTION_LIST_TABLE_CONFIG = [
  transactionTableHelper.display({
    id: "time",
    header: () => "Hora",
    cell: ({ row }) => row.original.time,
  }),
  transactionTableHelper.display({
    id: "amount",
    header: () => "Monto total",
    cell: ({ row }) => `ARS $ ${row.original.amount}`,
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
