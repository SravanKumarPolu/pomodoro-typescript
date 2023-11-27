// Pomodoro.tsx
import React, { Dispatch, SetStateAction } from "react";

interface PomodoroProps {
  initialTime: number;
  time: number;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setTimer: Dispatch<SetStateAction<number>>; // Include setTimer in the interface
}

const Pomodoro: React.FC<PomodoroProps> = ({ time }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      <div>
        <p>{formatTime(time)}</p>
      </div>
    </div>
  );
};

export const ControlButton: React.FC<{
  text: string;
  onClick: () => void;
}> = ({ text, onClick }) => (
  <button className="m-2 px-2 border-2 rounded" onClick={onClick}>
    {text}
  </button>
);

export default Pomodoro;
