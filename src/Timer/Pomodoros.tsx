// Pomodoros.tsx
import React, { useState, useEffect } from "react";
import { SelectedPage } from "@/shared/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  setPomodoroTime: (newTime: number) => void;
  selectedPage?: SelectedPage; // Make selectedPage optional
};

const Pomodoros: React.FC<Props> = ({
  setSelectedPage,
  setPomodoroTime,
  selectedPage,
}: Props) => {
  const [newTime, setNewTime] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setTime(25 * 60);

      setSelectedPage(selectedPage || SelectedPage.ShortBreak);
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage, selectedPage]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seconds = parseInt(newTime) * 60;
    if (!isNaN(seconds) && seconds > 0) {
      setPomodoroTime(seconds);
    }

    setNewTime("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-400 font-weight-500">Pomodoro</h2>
        <input
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md"
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

export default Pomodoros;
