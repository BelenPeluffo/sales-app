import { AppRouter } from "./modules/common/routes";

function App() {
  return (
    <div className="w-screen h-screen p-2">
      {/* {cierreState === ABIERTO ? <Session /> : <Login />} */}
      <AppRouter />
    </div>
  );
}

export default App;
