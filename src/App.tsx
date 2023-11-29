// App.tsx
import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "./shared/types";
import Hero from "./scenes/hero";
import { TimerProvider } from "./components/TimerContext";
import { SoundProvider } from "./components/SoundContext";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClose(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-200">
      <TimerProvider>
        <SoundProvider>
          <div
            className={`w-full mb-32 overflow-hidden shadow-md ${
              isTopOfPage ? "" : "bg-blue-500"
            }`}>
            <Navbar
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              isTopOfPage={isTopOfPage}
              onClose={handleClose}
            />
          </div>

          <div
            className={`w-full   overflow-hidden shadow-md ${
              isTopOfPage ? "" : "bg-blue-500"
            }`}>
            <Hero
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </SoundProvider>
      </TimerProvider>
    </div>
  );
}

export default App;
