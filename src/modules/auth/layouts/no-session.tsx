import { Outlet } from "react-router-dom";
import { useUserStore } from "../hooks";

const NoSession = () => {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col flex-wrap gap-2 w-full h-full text-center justify-center content-center">
      <h1 className="font-medium text-5xl">
        Bienvenidx{user ? `, ${user.name}` : ""}
      </h1>
      <Outlet />
    </div>
  );
};

export default NoSession;
