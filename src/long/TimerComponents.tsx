// TimerComponents.tsx
import React from "react";

interface TimerDisplay {
  time: string; // Change the type to string
}
export const ControlButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => (
  <button className="m-2 px-2 border-2 rounded" onClick={onClick}>
    {text}
  </button>
);

export const TimerDisplay: React.FC<{ time: any }> = ({ time }) => (
  <div> {time}</div>
);
