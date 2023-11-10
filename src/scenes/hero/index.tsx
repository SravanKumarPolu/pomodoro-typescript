import React, { useState, useEffect } from "react";
import { SelectedPage } from "@/shared/types";
import Link from "../navbar/Link";
import reset from "@/assets/reset.svg";
import next from "@/assets/next.svg";
import play from "@/assets/play.svg";
import pause from "@/assets/pause.svg";
import useMediaQuery from "@/hooks/useMediaQuery";
import Pomodoro from "@/pomodoro";
import ShortBreak from "@/short";
import LongBreak from "@/long";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero: React.FC<Props> = ({ selectedPage, setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
  const [time, setTime] = useState(25 * 60); // Initial time is 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="h-full flex items-center justify-center p-2">
      <div
        className={`flex h-2/3 mt-0  flex-col items-center justify-center  p-10 
       ${isAboveMediumScreens ? "w-5/6" : "w-full"}
       bg-gray-950 rounded text-white absolute`}>
        <div className="flex flex-col gap-2 items-center justify-around">
          <div className="flex flex-row m-2">
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="Pomodoro"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="ShortBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="LongBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
