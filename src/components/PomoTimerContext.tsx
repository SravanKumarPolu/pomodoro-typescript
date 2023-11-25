// TimerContext.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";

interface TimerContextProps {
  timerValue: number;
  handleTimerChange: (newValue: number) => void;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>; // Use React.Dispatch
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timerValue, setTimerValue] = useState<number>(25);

  const handleTimerChange: TimerContextProps["handleTimerChange"] = (
    newValue
  ) => {
    setTimerValue(newValue);
  };

  return (
    <TimerContext.Provider
      value={{ timerValue, handleTimerChange, setTimerValue }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = (): TimerContextProps => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }

  return context;
};
