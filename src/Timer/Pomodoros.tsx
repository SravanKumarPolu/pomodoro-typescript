// PomodoroTimer.tsx
import { useTimerContext } from "@/components/PomoTimerContext";
import React from "react";

const PomodoroTimer: React.FC = () => {
  const { timerValue, handleTimerChange } = useTimerContext();

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="timerValue" className="text-gray-400 font-weight-500">
          Pomodoro
        </label>
        <input
          type="number"
          id="timerValue"
          value={timerValue}
          onChange={(e) => handleTimerChange(parseInt(e.target.value))}
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
