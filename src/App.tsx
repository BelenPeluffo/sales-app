import { TooltipProvider } from "./modules/common/components/shadcn/tooltip";
import { AppRouter } from "./modules/common/routes";

function App() {
  return (
    <div className="w-screen h-screen p-2">
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </div>
  );
}

export default App;
