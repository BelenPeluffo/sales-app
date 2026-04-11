import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/shadcn/table";
import { CreateMovimientoButton } from "@/modules/movimientos";
import { TotalTransactionsBreakdown } from "../components";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TRANSACTION_LIST_TABLE_CONFIG } from "../configs";

const MOCK_MOVIMIENTOS = [
  {
    time: "10:50",
    amount: 35760,
    income: { amount: 35760, usesForeignCurrency: true },
  },
  {
    time: "11:50",
    amount: 30760,
    income: { amount: 30800 },
    expense: { amount: 40 },
    details: "khe",
  },
];

const Session = () => {
  const table = useReactTable({
    columns: TRANSACTION_LIST_TABLE_CONFIG,
    data: MOCK_MOVIMIENTOS,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="flex flex-row flex-wrap justify-between mt-6 mb-3 w-full content-center">
        <p className="font-medium text-xl w-[25%]">Transacciones del día</p>
        <div className="flex gap-1 w-fit flex-wrap content-center">
          <CreateMovimientoButton />
          <button className="!border-black border-1 h-fit px-1 rounded hover:cursor-pointer hover:bg-green-300">
            Ir a resumen
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-10">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-[40%]">
          <TotalTransactionsBreakdown />
        </div>
      </div>
    </>
  );
};

export default Session;
