import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextProps = {
  selectedColor: string;

  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  colorButtons: string[];

  setColor: (color: string) => void;
  allColorButtons: string[];
};

const colorButtons = [
  "bg-red-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-violet-300",
  "bg-orange-300",
];

const allColorButtons = [
  "bg-red-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-violet-300",
  "bg-orange-300",
  "bg-indigo-300",
  "bg-amber-300",
  "bg-emerald-300",
  "bg-purple-400",
];

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

type ColorProviderProps = {
  children: ReactNode;
};

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string>("bg-red-400"); // Initial color state

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
