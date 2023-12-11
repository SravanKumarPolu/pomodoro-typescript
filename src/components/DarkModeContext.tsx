// DarkModeContext.js
import React, { createContext, useContext, useState, ReactNode } from "react";

type DarkModeContextProps = {
  toggleDarkMode: () => void;
  darkMode: string;
};

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

type DarkModeProviderProps = {
  children: ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState("light"); // Default to light mode

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
