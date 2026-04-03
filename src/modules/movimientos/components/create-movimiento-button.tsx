import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/modules/common/components/shadcn/dialog";
import MovimientoForm from "./movimiento-form";

const CreateMovimientoButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="border-black border-1 h-fit px-1 rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300">
          Ingresar movimiento
        </button>
      </DialogTrigger>
      <DialogContent>
        <MovimientoForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateMovimientoButton;
