import React, { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";

import { ControlButton, TimerDisplay } from "./TimerComponents";
import useMediaQuery from "@/hooks/useMediaQuery";
type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const ShortBreak: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
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
      <div className="flex flex-row m-2 items-center gap-4">
        <ControlButton
          text="Reset"
          onClick={() => {
            toggleTimer();
            setTime(25 * 60);
            setIsActive(false);
          }}
        />
        <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
          <TimerDisplay time={formatTime(time)} />
        </div>

        <ControlButton
          text="Next"
          onClick={() => setSelectedPage(SelectedPage.ShortBreak)}
        />
      </div>
      {isAboveMediumScreens ? (
        <ControlButton
          text={isActive ? "Pause" : "Play"}
          onClick={() => toggleTimer()}
        />
      ) : (
        <ControlButton
          text={isActive ? "Pause" : "Play"}
          onClick={() => toggleTimer()}
        />
      )}
    </div>
  );
};

export default ShortBreak;
