const NoSession = () => {
  return (
    <div className="flex flex-row w-[60%] gap-1">
      <button className="!border-black border-1 w-[50%] rounded hover:cursor-pointer hover:bg-green-300">
        Cerrar sesión
      </button>
      <button
        className="border-black border-1 w-[50%] rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300"
        onClick={() => {}}
      >
        Abrir caja
      </button>
    </div>
  );
};

export default NoSession;
