import Navbar from "@/scenes/navbar";
import { useState } from "react";
import { SelectedPage } from "./shared/types";
import Hero from "./scenes/hero";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200">
      <div className="w-full p-4">
        <div className="app  rounded-lg overflow-hidden shadow-lg">
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <Hero selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
