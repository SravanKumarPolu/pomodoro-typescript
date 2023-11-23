// Index.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { SelectedPage } from "@/shared/types";
import Pomodoro, { ControlButton } from "./TimerComponents";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Index: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // Set the initial time

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-row m-2 items-center gap-4">
        <ControlButton
          text="Reset"
          onClick={() => {
            toggleTimer();
            setTime(25 * 60); // Reset time to initial time
            setIsActive(false);
          }}
        />

        <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
          <Pomodoro
            initialTime={25 * 60}
            time={time}
            isActive={isActive}
            setIsActive={setIsActive}
            setTimer={setTime}
          />
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

export default Index;
