import HoverLink from "./components/ui/dribbble/hover-transition";
import { Navigation } from "./components/ui/nav/Navigation";

function App() {
  return (
    <div className="min-w-screen bg-stone-200 dark:bg-stone-600">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col bg-stone-50 dark:bg-stone-900">
        <Navigation />
        <HoverLink />
      </div>
    </div>
  );
}

export default App;
