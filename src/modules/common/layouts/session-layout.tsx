import { Header } from "@/modules/cierres";
import { Outlet } from "react-router-dom";

const SessionLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default SessionLayout;
