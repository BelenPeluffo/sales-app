import Header from "./header";

const Session = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-row flex-wrap justify-between mt-6 w-full content-center">
        <p className="font-medium text-xl w-[25%]">Transacciones del día</p>
        <div className="flex gap-1 w-fit flex-wrap content-center">
          <button className="border-black border-1 h-fit px-1 rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300">
            Ingresar movimiento
          </button>
          <button className="!border-black border-1 h-fit px-1 rounded hover:cursor-pointer hover:bg-green-300">
            Ir a resumen
          </button>
        </div>
      </div>
    </div>
  );
};

export default Session;
