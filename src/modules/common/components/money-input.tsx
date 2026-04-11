import { getCurrencySymbol } from "@/modules/movimientos/utils";
import { Input } from "./shadcn/input";
import type { DetailedHTMLProps } from "react";
import type { CURRENCIES } from "@/modules/movimientos/constants";

interface MoneyInput extends DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  currency?: CURRENCIES;
}

const MoneyInput = ({ currency, ...inputProps }: MoneyInput) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        {currency ? getCurrencySymbol(currency) : "AR$"}
      </span>
      <Input
        type="number"
        className={currency || "pesosAr"}
        min={0}
        {...inputProps}
      />
    </div>
  );
};

export default MoneyInput;
