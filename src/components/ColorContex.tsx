import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextProps = {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  colorButtons: string[];
  setColor: (color: string) => void;
  allColorButtons: string[];
};

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

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

type ColorProviderProps = {
  children: ReactNode;
};

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string>("bg-green-400"); // Initial color state

  const setColor = (color: string) => {
    setSelectedColor(color);
  };

  const contextValue: ColorContextProps = {
    selectedColor,
    setSelectedColor,
    colorButtons,
    setColor,
    allColorButtons,
  };

  return (
    <ColorContext.Provider value={contextValue}>
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
