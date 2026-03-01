import { CierreSection } from "../../cierres";
import { CreateMovimientoButton } from "../../movimientos/components";

const Header = () => {
  return (
    <div className="flex items-center justify-end h-1/8 gap-2">
      <CreateMovimientoButton />
      <CierreSection />
    </div>
  );
};

export default Header;
