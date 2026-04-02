import { useCierreStore } from "@/modules/cierres/hooks/cierre-store";
import { useUserStore } from "../hooks";

const NoSession = () => {
  const { setUser } = useUserStore();
  const { abrirCierre } = useCierreStore();
  const logout = () => {
    setUser(null);
  };
  return (
    <div className="flex flex-row w-[60%] gap-1">
      <button
        className="!border-black border-1 w-[50%] rounded hover:cursor-pointer hover:bg-green-300"
        onClick={logout}
      >
        Cerrar sesión
      </button>
      <button
        className="border-black border-1 w-[50%] rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300"
        onClick={abrirCierre}
      >
        Abrir caja
      </button>
    </div>
  );
};

export default NoSession;
