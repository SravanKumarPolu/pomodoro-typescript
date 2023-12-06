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
    <div
      className={`flex flex-col  justify-center  relative h-screen ${
        isTopOfPage ? "bg-yellow-200" : "bg-pink-500 "
      }  drop-shadow`}>
      <TimerProvider>
        <SoundProvider>
          <div className="flex flex-col">
            <div className="w-full  top-0   overflow-hidden shadow-md absolute ">
              <Navbar
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isTopOfPage={isTopOfPage}
                onClose={handleClose}
              />
            </div>

            <div className="mt-40 ">
              <Hero
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                isTopOfPage={isTopOfPage}
              />
            </div>
          </div>
        </SoundProvider>
      </TimerProvider>
    </div>
  );
}

export default App;
