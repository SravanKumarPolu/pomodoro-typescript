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
  timerValue1: number;
  handleTimerChange1: Dispatch<SetStateAction<number>>;
  timerValue2: number;
  handleTimerChange2: Dispatch<SetStateAction<number>>;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timerValue1, setTimerValue1] = useState<number>(25);

  const handleTimerChange1: TimerContextProps["handleTimerChange1"] = (
    newValue
  ) => {
    setTimerValue1((prevTimerValue) =>
      typeof newValue === "function" ? newValue(prevTimerValue) : newValue
    );
  };

  const [timerValue2, setTimerValue2] = useState<number>(5);
  const handleTimerChange2: TimerContextProps["handleTimerChange2"] = (
    newValue
  ) => {
    setTimerValue2((prevTimerValue) =>
      typeof newValue === "function" ? newValue(prevTimerValue) : newValue
    );
  };
  return (
    <TimerContext.Provider
      value={{
        timerValue1,
        timerValue2,
        handleTimerChange2,
        handleTimerChange1,
      }}>
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
