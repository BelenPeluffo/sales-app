import { getTransactionsBreakdownConfig } from "../configs";
import { PAYMENT_METHODS } from "@/modules/movimientos/constants";
import TotalTransactionsTable from "./total-transactions-table";

// TODO: toda esta data se obtendrá de API
const MOCK_TRANSACTIONS_BREAKDOWN = {
  ingresos: {
    items: [
      { method: PAYMENT_METHODS.MAESTRO, subtotal: 20560 },
      { method: PAYMENT_METHODS.VISA_ELECTRON, subtotal: 11760 },
    ],
    subtotal: 1,
  },
  egresos: {
    items: [{ method: PAYMENT_METHODS.PESOS_AR, subtotal: 1 }],
    subtotal: 1,
  },
  total: 1,
};

const TotalTransactionsBreakdown = () => {
  return (
    <div className="flex flex-col w-full">
      Totales por medios de pago
      <TotalTransactionsTable
        config={getTransactionsBreakdownConfig('Ingresos')}
        data={MOCK_TRANSACTIONS_BREAKDOWN.ingresos.items}
      />
      <TotalTransactionsTable
        config={getTransactionsBreakdownConfig('Egresos')}
        data={MOCK_TRANSACTIONS_BREAKDOWN.egresos.items}
      />
    </div>
  );
};

export default TotalTransactionsBreakdown;
