import HoverLink from "./components/ui/dribbble/hover-transition";
import { Navigation } from "./components/ui/nav/Navigation";

function App() {
  return (
    <div className="min-w-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col bg-neutral-50 dark:bg-neutral-800">
        <Navigation />
        <HoverLink link="https://www.youtube.com" />
      </div>
    </div>
  );
}

export default App;
