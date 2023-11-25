// PomodoroTimer.tsx
import { useTimerContext } from "@/components/TimerContext";
import React from "react";

const PomodoroTimer: React.FC = () => {
  const { timerValue1, handleTimerChange1 } = useTimerContext();

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="timerValue" className="text-gray-400 font-weight-500">
          Pomodoro
        </label>
        <input
          type="number"
          id="timerValue"
          value={timerValue1}
          onChange={(e) => handleTimerChange1(parseInt(e.target.value))}
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default PomodoroTimer;
