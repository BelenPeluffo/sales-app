import { LoginButton, NewSessionButton } from "@/modules/auth";
import { Session } from "@/modules/cierres";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./private-route";
import NoSession from "@/modules/auth/layouts/no-session";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/session" />} />
        <Route element={<NoSession />}>
          <Route path="/login" element={<LoginButton />} />
          <Route
            path="/no-session"
            element={
              <PrivateRoute>
                <NewSessionButton />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/session"
          element={
            <PrivateRoute>
              <Session />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-movimiento"
          element={
            <PrivateRoute>
              <Session />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
