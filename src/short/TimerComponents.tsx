// TimerComponents.tsx
import React from "react";

export const ControlButton: React.FC<{ text: string; onClick: () => void }> = ({
  text,
  onClick,
}) => <button onClick={onClick}>{text}</button>;

export const TimerDisplay: React.FC<{ time: number }> = ({ time }) => (
  <div>Time: {time}</div>
);
