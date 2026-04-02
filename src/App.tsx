// import { Header } from "./modules/common";

import { Login, useUserStore, NoSession } from "./modules/auth";

function App() {
  const { user } = useUserStore();
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col flex-wrap gap-2 w-full h-full text-center justify-center content-center">
        <h1 className="font-medium text-5xl">
          Bienvenidx{user ? `, ${user.name}` : ""}
        </h1>
        {/* <Header /> */}
        {user ? <NoSession /> : <Login />}
      </div>
    </div>
  );
}

export default App;
