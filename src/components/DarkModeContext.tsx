// DarkModeContext.js
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type DarkModeContextProps = {
  setDarkMode: Dispatch<SetStateAction<string>>; // Correct type for setDarkMode
  setDarkModeColor: Dispatch<SetStateAction<string>>; // Correct type for setDarkModeColor
  darkMode: string;
  darkModeColor: string;
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
  const [darkMode, setDarkMode] = useState("bg-gray-100");
  const [darkModeColor, setDarkModeColor] = useState("bg-gray-700");

  return (
    <DarkModeContext.Provider
      value={{ darkMode, setDarkMode, setDarkModeColor, darkModeColor }}>
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
