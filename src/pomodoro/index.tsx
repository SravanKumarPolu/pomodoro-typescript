import React, { useState, useEffect } from "react";
import { SelectedPage } from "@/shared/types";

import reset from "@/assets/reset.svg";
import next from "@/assets/next.svg";
import play from "@/assets/play.svg";
import pause from "@/assets/pause.svg";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "@/scenes/navbar/Link";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Pomodoro = ({ selectedPage, setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
  const [time, setTime] = useState(25 * 60); // Initial time is 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Timer is up, you can add sound or notifications here
      // For simplicity, we'll reset the timer
      setIsActive(false);
      setTime(25 * 60); // Reset to 25 minutes
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {isAboveMediumScreens ? (
        <div className="flex flex-row m-2 items-center gap-4">
          <button className="m-2 px-2 border-2 rounded ">
            <Link
              page="Reset"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </button>
          <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
          </div>
          <button className="m-2 px-2 border-2 rounded ">
            <Link
              page="Next"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center ">
          <button className="flex bg-white m-2  border-2 rounded w-12 h-12 items-center  justify-center">
            <img className="  " src={reset} alt="" width={24} height={24} />
          </button>
          <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500  font-semibold flex items-center justify-center">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
          </div>
          <button className="flex bg-white m-2  border-2 rounded w-12 h-12 items-center  justify-center">
            <img className="  " src={next} alt="" width={24} height={24} />
          </button>
        </div>
      )}
      {isAboveMediumScreens ? (
        <div className="flex flex-row m-2">
          {isActive ? ( // Render "Pause" button when the timer is active
            <button
              onClick={toggleTimer}
              className="m-2 px-2 border-2 rounded ">
              <Link
                page="Pause"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          ) : (
            <button
              onClick={toggleTimer}
              className="m-2 px-2 border-2 rounded ">
              <Link
                page="Play"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center gap-1">
          {isActive ? (
            <button
              onClick={toggleTimer}
              className="flex bg-white m-2  border-2 rounded w-12 h-12 items-center  justify-center">
              <img className="  " src={pause} alt="" width={24} height={24} />
            </button>
          ) : (
            <button className="flex bg-white m-2  border-2 rounded w-12 h-12 items-center  justify-center">
              <img
                onClick={toggleTimer}
                className="  "
                src={play}
                alt=""
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
