import React from "react";
import { useState } from "react";

type Props = {
  setPomodoroTime: (newTime: number) => void;
};

const Pomodoro = ({ setPomodoroTime }: Props) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-400 font-weight-500">Pomodoro</h2>
        <input
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md"
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

export default Pomodoro;
