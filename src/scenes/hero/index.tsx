import { SelectedPage } from "@/shared/types";
import Link from "../navbar/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import Pomodoro from "@/pomodoro";
import ShortBreak from "@/short";
import LongBreak from "@/long";

import { useEffect, useState } from "react";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  remainingTime: number; // Add remainingTime to the Props type
};

const Hero: React.FC<Props> = ({ selectedPage, setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");

  const [remainingTime, setRemainingTime] = useState<number>(25 * 60);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // const handleTimeout = () => {
    //   switch (selectedPage) {
    //     case SelectedPage.Pomodoro:
    //       setSelectedPage(SelectedPage.ShortBreak);
    //       setRemainingTime(5 * 60);

    //       break;
    //     case SelectedPage.LongBreak:
    //       setSelectedPage(SelectedPage.Pomodoro);
    //       setRemainingTime(25 * 60);
    //       break;
    //     case SelectedPage.ShortBreak:
    //       setSelectedPage(SelectedPage.Pomodoro);
    //       setRemainingTime(25 * 60);
    //       break;
    //     default:
    //       break;
    //   }
    // };

    timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          // handleTimeout();
          clearInterval(timer);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedPage, setSelectedPage, remainingTime]);

  const renderPage = () => {
    switch (selectedPage) {
      case SelectedPage.Pomodoro:
        return (
          <Pomodoro
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      case SelectedPage.ShortBreak:
        return (
          <ShortBreak
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      case SelectedPage.LongBreak:
        return (
          <LongBreak
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      default:
        return (
          <Pomodoro
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-2">
      <div
        className={`flex h-2/3 mt-0  flex-col items-center justify-center  p-10 
       ${isAboveMediumScreens ? "w-5/6" : "w-full"}
       bg-gray-950 rounded text-white absolute`}>
        <div className="flex flex-col gap-2 items-center justify-around">
          <div className="flex flex-row m-2">
            <button
              className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs"
              onClick={() => setSelectedPage(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs"
              onClick={() => setSelectedPage(SelectedPage.ShortBreak)}>
              <Link
                page="ShortBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs"
              onClick={() => setSelectedPage(SelectedPage.LongBreak)}>
              <Link
                page="LongBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Hero;
