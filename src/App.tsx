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
    <main
      className={`w-full    top-0   overflow-hidden shadow-md  ${
        isDarkMode ? "bg-gray-700" : " "
      }`}>
      <div
        className={`w-full    top-0   overflow-hidden shadow-md  ${
          isDarkMode ? "bg-gray-700" : " "
        }`}>
        <Navbar
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isTopOfPage={isTopOfPage}
          onClose={handleClose}
        />
      </div>
      <section className="xl:padding-l wide:padding-r padding-b  ">
        <Hero
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          isTopOfPage={isTopOfPage}
        />
      </section>
    </main>
  );
}

export default App;
