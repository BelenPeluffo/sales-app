import { Tooltip, TooltipContent, TooltipTrigger } from "@/modules/common/components/shadcn/tooltip";
import { CircleAlert } from "lucide-react";

const CurrencyTooltip = () => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <CircleAlert size={20} />
      </TooltipTrigger>
      <TooltipContent>
        Este movimiento contiene transacciones en moneda extranjera. El valor
        mostrado corresponde a su equivalencia en ARS $ según la cotización de
        hoy.
      </TooltipContent>
    </Tooltip>
  );
};

export default CurrencyTooltip;
