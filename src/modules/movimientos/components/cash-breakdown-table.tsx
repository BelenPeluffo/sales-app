import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/modules/common/components/shadcn/accordion";
import { Input } from "@/modules/common/components/shadcn/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/shadcn/table";

const MOCK_DENOMINACION_PESOS_AR = [100, 200, 500, 1000, 5000, 10000, 20000];

const CashBreakdownTable = ({ index }: { index: number }) => {
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
              <TableRow>
                <TableHead>Denominación</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DENOMINACION_PESOS_AR.map((denominacion) => (
                <TableRow>
                  <TableCell>AR$ {denominacion}</TableCell>
                  <TableCell>
                    <Input type="number" min={0} />
                  </TableCell>
                  <TableCell>AR$</TableCell>
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
