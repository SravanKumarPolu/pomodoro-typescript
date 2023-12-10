// colorContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextProps = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  colorButtons: string[];
  allColorButtons: string[];
};

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

type ColorProviderProps = {
  children: ReactNode;
};

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string>(""); // Initial color state

  const colorButtons = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-violet-400",
    "bg-orange-400",
  ];

  const allColorButtons = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-violet-400",
    "bg-orange-400",
    "bg-indigo-400",
    "bg-amber-500",
    "bg-emerald-400",
    "bg-purple-400",
  ];

  return (
    <ColorContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
        colorButtons,
        allColorButtons,
      }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }

  return context;
};
