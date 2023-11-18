// Timer.tsx
import React, { useState } from "react";
import TimerSvg from "@/assets/Timer.svg";

type Props = {
  setPomodoroTime: (newTime: number) => void; // Function to update Pomodoro time
};

const Timer = ({ setPomodoroTime }: Props) => {
  const [newTime, setNewTime] = useState(""); // State to store the new time input

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert the input to seconds and update Pomodoro time
    const seconds = parseInt(newTime) * 60;
    if (!isNaN(seconds) && seconds > 0) {
      setPomodoroTime(seconds);
    }

    // Clear the input field
    setNewTime("");
  };

  return (
    <div className="w-[20rem] p-2">
      <div className="flex flex-row p-1">
        <img src={TimerSvg} width={20} height={20} />
        <h2>Timer</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Pomodoro</h2>
        <input
          className="w-[4rem] h-[2rem]"
          type="number"
          placeholder="Enter minutes"
          value={newTime}
          onChange={handleInputChange}
        />
        <button type="submit"></button>
      </form>
      <form onSubmit={handleSubmit}>
        <h2>Short Break</h2>
        <input
          className="w-[4rem] h-[2rem]"
          type="number"
          placeholder="Enter minutes"
          value={newTime}
          onChange={handleInputChange}
        />
        <button type="submit"></button>
      </form>
      <form onSubmit={handleSubmit}>
        <h2>Long Break</h2>
        <input
          className="w-[4rem] h-[2rem]"
          type="number"
          placeholder="Enter minutes"
          value={newTime}
          onChange={handleInputChange}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default Timer;
