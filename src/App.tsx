import { Login } from "./modules/auth";
import { Session, useCierreStore } from "./modules/cierres";
import { ABIERTO } from "./modules/cierres/hooks/cierre-store";

function App() {
  const { state: cierreState } = useCierreStore();
  return (
    <div className="w-screen h-screen">
      {cierreState === ABIERTO ? <Session /> : <Login />}
    </div>
  );
}

export default App;
