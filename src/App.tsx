// App.tsx
import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "./shared/types";
import Hero from "./scenes/hero";
import { useDarkMode } from "./components/DarkModeContext";

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
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex flex-col  justify-center  relative h-screen ${
        isTopOfPage ? " " : "bg-pink-500 "
      }  drop-shadow`}>
      <div className="flex flex-col ">
        <div
          className={`w-full  top-0   overflow-hidden shadow-md absolute ${
            isDarkMode ? "bg-gray-700" : ""
          }`}>
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isTopOfPage={isTopOfPage}
            onClose={handleClose}
          />
        </div>

        <div className="mt-40 bg-pink">
          <Hero
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            isTopOfPage={isTopOfPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
