// Pomodoros.tsx
import React, { useState } from "react";
import Pomodoro from "@/pomodoro/TimerComponents";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {};

const Pomodoros: React.FC<Props> = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isActive, setIsActive] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = parseInt(e.target.value, 10);
    setMinutes(isNaN(newMinutes) ? 0 : newMinutes);
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeconds = parseInt(e.target.value, 10);
    setSeconds(isNaN(newSeconds) ? 0 : newSeconds);
  };

  return (
    <div>
      <div>
        <h2 className="text-gray-400 font-weight-500">Pomodoro</h2>
        <div>
          <input type="number" value={minutes} onChange={handleMinuteChange} />
        </div>
      </div>
    </div>
  );
};

export default Pomodoros;
