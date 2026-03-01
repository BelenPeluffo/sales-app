import { ABIERTO, useCierreStore } from "../hooks/cierre-store";

const CierreSection = () => {
  const state = useCierreStore((state) => state.state);
  const abrirCierre = useCierreStore((state) => state.abrirCierre);
  const cerrarCierre = useCierreStore((state) => state.cerrarCierre);

  const handleClick = () => {
    if (state === ABIERTO) {
      cerrarCierre();
    } else {
      abrirCierre();
    }
  };

  return (
    <div className="flex items-center justify-end h-1/8">
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
      >
        {state === ABIERTO ? "Abrir" : "Cerrar"} cierre
      </button>
    </div>
  );
};

export default CierreSection;
