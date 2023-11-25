// PomodoroTimer.tsx
import { useTimerContext } from "@/components/PomoTimerContext";
import React from "react";

const PomodoroTimer: React.FC = () => {
  const { timerValue, handleTimerChange } = useTimerContext();

  return (
    <div className="h-[20rem] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>
      <div className="mb-4">
        <label htmlFor="timerValue" className="mr-2">
          Set Timer:
        </label>
        <input
          type="number"
          id="timerValue"
          value={timerValue}
          onChange={(e) => handleTimerChange(parseInt(e.target.value))}
          className="border p-2"
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
