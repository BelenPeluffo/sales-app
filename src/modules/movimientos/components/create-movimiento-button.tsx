import { useNavigate } from "react-router-dom";

const CreateMovimientoButton = () => {
  // TODO: En vez de implementar MovimientoForm en un modal, hacerlo en una vista aparte. Para éso está navigate.
  const navigate = useNavigate();
  const navigateToMovimientoForm = () => {
    navigate("/create-movimiento");
  };
  return (
    <button
      className="border-black border-1 h-fit px-1 rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300"
      onClick={navigateToMovimientoForm}
    >
      Ingresar movimiento
    </button>
    // <Dialog>
    //   <DialogTrigger>
    //     <button className="border-black border-1 h-fit px-1 rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300">
    //       Ingresar movimiento
    //     </button>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <MovimientoForm />
    //   </DialogContent>
    // </Dialog>
  );
};

export default CreateMovimientoButton;
