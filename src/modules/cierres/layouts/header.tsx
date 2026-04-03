import { useUserStore } from "@/modules/auth";
import { useCierreStore } from "../hooks";

const Header = () => {
  const { user, setUser } = useUserStore();
  const { initialAmount, cerrarCierre } = useCierreStore();
  const currentDate = new Date();
  const dateAndTime = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;

  const logout = () => {
    cerrarCierre();
    setUser(null);
  };
  return (
    <div className="flex flex-wrap flex-row w-full justify-between">
      <p className="font-medium font-grey-20">{`${user?.name} ${user?.lastname}`}</p>
      <p>$ {initialAmount} | {dateAndTime}</p>
      <button
        className="!border-black border-1 w-[25%] rounded hover:cursor-pointer hover:bg-green-300"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Header;
