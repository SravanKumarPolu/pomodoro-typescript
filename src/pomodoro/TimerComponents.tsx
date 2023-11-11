// TimerComponents.tsx
import React from "react";

interface TimerDisplay {
  time: string; // Change the type to string
}
export const ControlButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => <button onClick={onClick}>{text}</button>;

export const TimerDisplay: React.FC<{ time: any }> = ({ time }) => (
  <div>Time: {time}</div>
);
