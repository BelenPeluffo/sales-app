import type { Payment } from "@/modules/movimientos/types";
import { createColumnHelper } from "@tanstack/react-table";

const totalTransactionBreakdownTableHelper = createColumnHelper<Payment>();

const moneyFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
});

export const getTransactionsBreakdownConfig = (title: string) => [
  totalTransactionBreakdownTableHelper.group({
    header: title,
    columns: [
      totalTransactionBreakdownTableHelper.accessor("method", {
        header: "Método de pago",
        // TODO: implementar lógica para obtener el string correspondiente al ID del method
        cell: (info) => info.getValue(),
        footer: () => "SUBTOTAL",
      }),
      totalTransactionBreakdownTableHelper.accessor("subtotal", {
        header: "Monto",
        cell: (info) => {
          // TODO: en función del valor de `method` determinar el moneyFormat correspondiente
          const subtotal = info.getValue();
          return moneyFormat.format(subtotal);
        },
        footer: (info) => {
          // TODO: acá habría que implementar luego lógica para  transformar a pesos las monedas extranjeras
          const total = info.table
            .getRowModel()
            .rows.reduce((subtotal, row) => {
              return subtotal + Number(row.getValue("subtotal"));
            }, 0);
          return moneyFormat.format(total);
        },
      }),
    ],
  }),
];
