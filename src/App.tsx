// App.tsx
import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "./shared/types";
import Hero from "./scenes/hero";
import { TimerProvider } from "./components/TimerContext";

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
    <div className="flex flex-col items-center justify-center h-screen bg-lavender-200">
      <TimerProvider>
        <div className="w-full mb-16 overflow-hidden shadow-md">
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isTopOfPage={isTopOfPage}
            onClose={handleClose}
          />
        </div>

        <div className="w-full p-4 mt-16">
          <div className=" rounded-lg overflow-hidden   ">
            <Hero
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </div>
      </TimerProvider>
    </div>
  );
}

export default App;
