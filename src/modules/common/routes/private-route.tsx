import { useUserStore } from "@/modules/auth";
import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore();
  // const {state} = useCierreStore()
  console.log("user?", user);
  if (!user) return <Navigate to="/login" replace />;
  // if (state === CERRADO) return <Navigate to="/no-session" replace />;

  return children ? children : <Outlet />;
};

export default PrivateRoute;
