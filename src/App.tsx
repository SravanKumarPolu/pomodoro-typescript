// App.tsx
import Navbar from "@/scenes/navbar";
import { useEffect, useState } from "react";
import { SelectedPage } from "./shared/types";
import Hero from "./scenes/hero";

import { useDarkMode } from "./components/DarkModeContext";
import { useColor } from "./components/ColorContex";

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
  const { selectedColor } = useColor();
  return (
    <div
      className={`w-auto   overflow-hidden shadow-md  ${
        isDarkMode ? "bg-gray-700" : selectedColor
      }`}>
      <section>
        <Navbar
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isTopOfPage={isTopOfPage}
          onClose={handleClose}
        />
      </section>
      <section>
        <Hero selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </section>
    </div>
  );
}

export default App;
