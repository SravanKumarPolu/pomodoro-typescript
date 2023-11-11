import React, { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";

import { ControlButton, TimerDisplay } from "./TimerComponents";
type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const ShortBreak: React.FC<Props> = ({ setSelectedPage }: Props) => {
  // const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
  const [time, setTime] = useState(5 * 60); // Initial time is 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setTime(5 * 60); // Reset to 5 minutes
      setSelectedPage(SelectedPage.Pomodoro); // Automatically switch to Pomodoro
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage]);

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

  return (
    <div className="flex justify-center items-center flex-col">
      <ControlButton
        text="Reset"
        onClick={() => {
          toggleTimer();
          setTime(5 * 60);
          setIsActive(false);
        }}
      />
      <TimerDisplay time={formatTime(time)} />
      <ControlButton
        text="Next"
        onClick={() => setSelectedPage(SelectedPage.Pomodoro)}
      />

      <ControlButton
        text={isActive ? "Pause" : "Play"}
        onClick={() => toggleTimer()}
      />
    </div>
  );
};

export default ShortBreak;
