import { ABIERTO, useCierreStore } from "../hooks/cierre-store";

const CierreButton = () => {
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
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
    >
      {state === ABIERTO ? "Abrir" : "Cerrar"} cierre
    </button>
  );
};

export default CierreButton;
