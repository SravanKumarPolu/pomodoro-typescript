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
  const flexBetween = "flex items-center justify-between";

  const appBackground = isTopOfPage ? "" : "bg-pink-500 drop-shadow";
  return (
    <div
      className={`flex flex-col items-center justify-center  h-screen ${
        isTopOfPage ? "bg-yellow-200" : "bg-pink-500 "
      } drop-shadow`}>
      <TimerProvider>
        <SoundProvider>
          <div className="w-full mb-36 overflow-hidden shadow-md ">
            <Navbar
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              isTopOfPage={isTopOfPage}
              onClose={handleClose}
            />
          </div>

          <div>
            <Hero
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              isTopOfPage={isTopOfPage}
            />
          </div>
        </SoundProvider>
      </TimerProvider>
    </div>
  );
}

export default App;
