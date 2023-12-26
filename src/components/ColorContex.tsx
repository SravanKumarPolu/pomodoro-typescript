import React, { createContext, useContext, useState, ReactNode } from "react";

type ColorContextProps = {
  selectedColor: string;

  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  colorButtons: string[];

  setColor: (color: string) => void;
  allColorButtons: string[];
};

const colorButtons = [
  "bg-gradient-to-br from-pink-500 to-indigo-900",
  "bg-gradient-to-br from-green-400 to-teal-500",
  "bg-gradient-to-br from-pink-300 to-pink-500",
  "bg-gradient-to-br from-indigo-900 to-purple-300",
];

const allColorButtons = [
  "bg-gradient-to-br from-pink-500 to-indigo-900",
  "bg-gradient-to-br from-red-400 to-pink-500",
  "bg-gradient-to-br from-green-400 to-teal-500",
  "bg-gradient-to-br from-pink-300 to-pink-500",
  "bg-gradient-to-br from-indigo-900 to-purple-300",
  "bg-gradient-to-br from-pink-500 to-red-500",
  "bg-gradient-to-br from-blue-400 to-indigo-800",
  "bg-gradient-to-br from-orange-500 to-yellow-300 ",
  "bg-gradient-to-br from-blue-800 to-green-400",
  "bg-gradient-to-br from-blue-300 to-indigo-800",
  "bg-gradient-to-br from-green-600 to-yellow-300",
  "bg-gradient-to-br from-blue-900 to-pink-500",
  "bg-gradient-to-br from-pink-400 to-cool-gray-800",
  "bg-gradient-to-br from-blue-500 to-purple-800",
  "bg-gradient-to-br from-indigo-600 to-teal-400",
  "bg-gradient-to-br from-yellow-500 to-indigo-800",
];

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

type ColorProviderProps = {
  children: ReactNode;
};

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    "bg-gradient-to-br from-blue-900 to-pink-500"
  ); // Initial color state

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
