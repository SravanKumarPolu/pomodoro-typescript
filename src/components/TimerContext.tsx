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
  timerValue3: number;
  handleTimerChange3: Dispatch<SetStateAction<number>>;
  formatTime: (time: number) => string; // Updated to accept time as a parameter
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timerValue1, setTimerValue1] = useState<number>(25);
  const [timerValue2, setTimerValue2] = useState<number>(5);
  const [timerValue3, setTimerValue3] = useState<number>(15);

  const formatTime = (time: number) => {
    // Updated to accept time as a parameter
    const minutes = Math.floor(time / 60);
    const remainingSeconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleTimerChange1: TimerContextProps["handleTimerChange1"] = (
    newValue
  ) => {
    setTimerValue1((prevTimerValue) =>
      typeof newValue === "function" ? newValue(prevTimerValue) : newValue
    );
  };

  const handleTimerChange2: TimerContextProps["handleTimerChange2"] = (
    newValue
  ) => {
    setTimerValue2((prevTimerValue) =>
      typeof newValue === "function" ? newValue(prevTimerValue) : newValue
    );
  };

  const handleTimerChange3: TimerContextProps["handleTimerChange3"] = (
    newValue
  ) => {
    setTimerValue3((prevTimerValue) =>
      typeof newValue === "function" ? newValue(prevTimerValue) : newValue
    );
  };

  return (
    <TimerContext.Provider
      value={{
        timerValue1,
        timerValue2,
        handleTimerChange1,
        handleTimerChange2,
        timerValue3,
        handleTimerChange3,
        formatTime,
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
