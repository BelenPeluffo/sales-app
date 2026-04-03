import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/common/components/shadcn/table";
import Header from "./header";
import { CreateMovimientoButton } from "@/modules/movimientos";

const MOCK_MOVIMIENTOS = [
  {
    time: "10:50",
    total: 35760,
  },
  {
    time: "11:50",
    total: 30760,
  },
];

const Session = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-row flex-wrap justify-between mt-6 mb-3 w-full content-center">
        <p className="font-medium text-xl w-[25%]">Transacciones del día</p>
        <div className="flex gap-1 w-fit flex-wrap content-center">
          <CreateMovimientoButton />
          <button className="!border-black border-1 h-fit px-1 rounded hover:cursor-pointer hover:bg-green-300">
            Ir a resumen
          </button>
        </div>
      </div>
      <Table>
        {/** TODO: implementar gestión de tabla con react-query */}
        <TableHeader>
          <TableRow>
            <TableHead>Hora</TableHead>
            <TableHead>Monto total</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {MOCK_MOVIMIENTOS.map((movimiento) => {
                return (
                    <TableRow>
                        <TableCell>{movimiento.time}</TableCell>
                        <TableCell>ARS $ {movimiento.total}</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Session;
