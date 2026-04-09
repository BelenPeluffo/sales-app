import { CURRENCIES, PAYMENT_METHODS } from "../constants";

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
 * Calcula el total de una moneda según las denominaciones y cantidades
 * que se le pasen en el objeto currencyState.
 *
 * @param {Object} currencyState - Un objeto que contiene las denominaciones
 *                           y cantidades de cada una.
 * @param {CURRENCIES} [currency] - La moneda para la que se calculará el total.
 * @returns {number} El total de la moneda.
 */
export const getCurrencyTotal = ({
  currencyState,
  // TODO: por aquí luego se pasará sólo el array de denominaciones, por lo que la propiedad pasará a llamarse "denominations"
  currency,
}: {
  currencyState?: Record<number, { amount: number }>;
  currency?: CURRENCIES;
}) => {
  if (!currency || !currencyState) return;
  // TODO: cuando obtengamos las denominaciones desde API, esta variable no se usará más y pasaremos directo a definedDenominations
  const denominations = currencyDenominations(currency);
  const definedDenominations = Object.keys(currencyState).filter(
    (denomination) => {
      const billsAmount = currencyState[Number(denomination)]?.amount;
      return (
        billsAmount &&
        billsAmount > 0 &&
        denominations.includes(Number(denomination))
      );
    },
  );

  const currencyTotal = definedDenominations.reduce((total, denomination) => {
    const denominationSubtotal =
      currencyState[Number(denomination)].amount * Number(denomination);
    return total + denominationSubtotal;
  }, 0);

  return currencyTotal;
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
