import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/modules/common/components/shadcn/table";
import type { Payment } from "@/modules/movimientos/types";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

const TotalTransactionsTable = ({
  config,
  data,
}: {
  config: Array<ColumnDef<Payment>>;
  data: Array<Payment>;
}) => {
  const table = useReactTable({
    columns: config,
    data: data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              );
            })}
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
      <TableFooter>
        {table
          .getFooterGroups()
          .filter((footerGroup) => {
            const isNotGroupFooter = footerGroup.depth > 0;
            return isNotGroupFooter;
          })
          .map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
      </TableFooter>
    </Table>
  );
};

export default TotalTransactionsTable;
