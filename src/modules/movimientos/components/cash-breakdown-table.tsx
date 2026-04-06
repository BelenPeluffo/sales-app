import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/shadcn/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  cashBreakdownColumnHelper,
  getCurrencySymbol,
  getFormatedBillDisplay,
} from "../utils";
import { Input } from "@/modules/common/components/shadcn/input";
import { Controller, useFormContext } from "react-hook-form";
import { memo, useMemo } from "react";
import type { CURRENCIES } from "../constants";

// TODO: obtener ésto desde la API
const MOCK_DENOMINACION_PESOS_AR = [100, 200, 500, 1000, 5000, 10000, 20000];

const CashBreakdownTable = memo(function ({
  index,
  currency,
}: {
  index: number;
  currency: CURRENCIES;
}) {
  const { control } = useFormContext();
  const CASH_BREAKDOWN_CONFIG = useMemo(
    () => [
      cashBreakdownColumnHelper.display({
        id: "bill",
        header: () => <TableHead>Denominación</TableHead>,
        cell: ({ row }) =>
          `${getCurrencySymbol(currency)} ${getFormatedBillDisplay(row.original.bill)}`,
      }),
      cashBreakdownColumnHelper.accessor("amount", {
        header: () => <TableHead>Cantidad</TableHead>,
        cell: ({ row }) => (
          <Controller
            name={`payments.${index}.cashBreakdown.${currency}.${row.original.bill}.amount`}
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" min={0} key={index} />
            )}
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
    ],
    [control, index, currency],
  );

  const table = useReactTable({
    columns: CASH_BREAKDOWN_CONFIG,
    data: MOCK_DENOMINACION_PESOS_AR.map((denominacion) => ({
      bill: denominacion,
      amount: 0,
      subtotal: 0,
    })),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) =>
              flexRender(header.column.columnDef.header, header.getContext()),
            )}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default CashBreakdownTable;
