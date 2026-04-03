import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/modules/common/components/shadcn/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/modules/common/components/shadcn/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/modules/common/components/shadcn/select";

// TODO: Implementar servicio para obtenerlos desde API & Crear file de constantes donde los IDs queden guardados*
/*
*CONSULTA: ¿Cuál es la mejor práctica con respecto a usar datos desde API para condicionar lógica en el FE?
- ¿Usar los IDs guardándolos en una store, por ejemplo?
- ¿O recurriendo a los strings?
Quizás guardarlos en store en caso de que se necesite saber su valor en más de un lugar.
*/
const PAYMENT_METHODS = [
  { name: "Visa electrón", value: 1 },
  { name: "Maestro", value: 2 },
  { name: "US$ Dólares", value: 3 },
  { name: "R Reales", value: 4 },
  { name: "AR$ Pesos Argentinos", value: 5 },
];

const CreateMovimientoButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="border-black border-1 h-fit px-1 rounded hover:cursor-pointer bg-green-300 hover:ring-2 hover:ring-green-300">
          Ingresar movimiento
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ingresar movimiento</DialogTitle>
        </DialogHeader>
        <form action="">
          <FieldGroup>
            <Field>
              <FieldLabel>Método de pago</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Método de pago</SelectLabel>
                    {PAYMENT_METHODS.map((method) => (
                      <SelectItem
                        value={method.value.toString()}
                        key={method.value}
                      >
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMovimientoButton;
