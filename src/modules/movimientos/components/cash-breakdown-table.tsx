import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/common/components/shadcn/accordion";
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
import { CASH_BREAKDOWN_CONFIG } from "../configs";

// TODO: obtener ésto desde la API
const MOCK_DENOMINACION_PESOS_AR = [100, 200, 500, 1000, 5000, 10000, 20000];

const CashBreakdownTable = ({ index }: { index: number }) => {
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
    <Accordion
      type="single"
      collapsible
      className="hover:cursor-ponter hover:text-decorator-green-300"
    >
      <AccordionItem value={`pesos-ar-table-${index}`}>
        <AccordionTrigger>Breakdown de denominaciones</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) =>
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    ),
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CashBreakdownTable;
