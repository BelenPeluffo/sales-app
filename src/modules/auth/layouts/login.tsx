import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/common/components/shadcn/dialog";

const Login = () => {
  return (
    <div className="flex flex-col flex-wrap gap-2 w-full h-full text-center justify-center content-center">
      <h1 className="font-medium text-5xl">Bienvenidx</h1>
      <Dialog>
        <DialogTrigger asChild>
          <button className="border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
            Abrir sesión
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Iniciar sesión</DialogTitle>
          </DialogHeader>
          Khe
          <DialogFooter>
            <DialogClose asChild>
              <button className="border-black border-1 rounded w-[25%] hover:cursor-pointer hover:bg-green-300">
                Cancelar
              </button>
            </DialogClose>
            <button className="border-black border-1 rounded w-[25%] hover:cursor-pointer bg-green-300 hover:shadow-[0_0_30px_rgb(134,239,172,0.6)]">
              Ingresar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
