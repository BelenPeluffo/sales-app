import { CURRENCIES } from "../constants";

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
