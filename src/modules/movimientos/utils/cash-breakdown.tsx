import { CURRENCIES, PAYMENT_METHODS } from "../constants";
import type { CashBreakdown } from "../types";

export const getFormatedBillDisplay = (bill: number) => {
  const isBillAThousand = bill / 1000 >= 1;
  if (isBillAThousand) return `${bill / 1000}.000`;
  return bill;
};

export const getCurrencySymbol = (currency: CURRENCIES) => {
  switch (currency) {
    case CURRENCIES.DOLLARS:
      return "US$";
    case CURRENCIES.REAIS:
      return "R$";
    case CURRENCIES.PESOS_AR:
    default:
      return "AR$";
  }
};

/**
 * Obtiene el string equivalente en CURRENCIES para el ID de la currency proveniente de API.
 *
 * @param {CURRENCIES} currencyId - El ID de la currency proveniente de API.
 * @returns {CURRENCIES} El string equivalente en CURRENCIES (por ejemplo, "pesosAr").
 */
export const getCurrencyKey = (currencyId: CURRENCIES): CURRENCIES => {
  const currencyKey = String(PAYMENT_METHODS[currencyId as unknown as number]);
  return CURRENCIES[currencyKey as keyof typeof CURRENCIES];
};

// TODO: obtener ésto desde la API
const MOCK_DENOMINACION_PESOS_AR = [100, 200, 500, 1000, 5000, 10000, 20000];
const MOCK_DENOMINACION_DOLLARS = [1, 2, 5, 10, 20, 50, 100];
const MOCK_DENOMINACION_REAIS = [2, 5, 10, 20, 50, 100, 200];

// TODO: obtener ésto desde la API
export const currencyDenominations = (currency: CURRENCIES) => {
  switch (currency) {
    case CURRENCIES.PESOS_AR:
      return MOCK_DENOMINACION_PESOS_AR;
    case CURRENCIES.DOLLARS:
      return MOCK_DENOMINACION_DOLLARS;
    case CURRENCIES.REAIS:
      return MOCK_DENOMINACION_REAIS;
  }
};
