import { Login } from "./modules/auth";
import { Session, useCierreStore } from "./modules/cierres";

function App() {
  const { state: cierreState } = useCierreStore();
  return (
    <div className="w-screen h-screen">
      {cierreState ? <Session /> : <Login />}
    </div>
  );
}

export default App;
