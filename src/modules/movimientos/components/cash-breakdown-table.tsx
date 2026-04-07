import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/modules/common/components/shadcn/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { currencyDenominations } from "../utils";
import { memo, useMemo } from "react";
import { CASH_BREAKDOWN_CONFIG } from "../configs";
import { usePaymentItemStore } from "../stores";

const CashBreakdownTable = memo(function () {
  const { currency } = usePaymentItemStore();

  const currentDenominations = useMemo(
    () =>
      currency
        ? currencyDenominations(currency).map((denominacion) => ({
            bill: denominacion,
            amount: 0,
            subtotal: 0,
          }))
        : [],
    [currency],
  );

  const table = useReactTable({
    columns: CASH_BREAKDOWN_CONFIG,
    data: currentDenominations,
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
