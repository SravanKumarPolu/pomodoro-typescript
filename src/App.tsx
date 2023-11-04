import Navbar from "@/scenes/navbar";
import { useState } from "react";
import { SelectedPage } from "./shared/types";
import Hero from "./scenes/hero";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  return (
    <>
      <div className="app  bg-gray-20">
        <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
        <Hero selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </div>
    </>
  );
}

export default App;
