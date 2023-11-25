// PomodoroTimer.tsx
import { useTimerContext } from "@/components/PomoTimerContext";
import React, { useState } from "react";

const PomodoroTimer: React.FC = () => {
  const [newTime, setNewTime] = useState("");
  const [time, setTime] = useState(15 * 60);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  return (
    <div>
      <form>
        <h2 className="text-gray-400 font-weight-500">Long Break</h2>
        <input
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
          type="number"
          placeholder="Enter minutes"
          defaultValue={time / 60}
          onChange={handleInputChange}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default PomodoroTimer;
