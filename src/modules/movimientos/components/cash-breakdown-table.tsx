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
import { CURRENCIES } from "../constants";
import { getCashBreakdownTableConfig } from "../configs";

const CashBreakdownTable = memo(function ({
  index,
  currency,
}: {
  index: number;
  currency: CURRENCIES;
}) {
  const CASH_BREAKDOWN_CONFIG = useMemo(
    () => getCashBreakdownTableConfig({ index, currency }),
    [index, currency],
  );

  const currentDenominations = useMemo(
    () =>
      currencyDenominations(currency).map((denominacion) => ({
        bill: denominacion,
        amount: 0,
        subtotal: 0,
      })),
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
