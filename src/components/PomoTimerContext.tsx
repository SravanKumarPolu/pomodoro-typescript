// TimerContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface TimerContextProps {
  timerValue: number;
  handleTimerChange: Dispatch<SetStateAction<number>>;
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
    setTimerValue((prevTimerValue) =>
      typeof newValue === "function" ? newValue(prevTimerValue) : newValue
    );
  };

  return (
    <TimerContext.Provider value={{ timerValue, handleTimerChange }}>
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
