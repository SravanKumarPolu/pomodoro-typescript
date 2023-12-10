import { SelectedPage } from "@/shared/types";
import Link from "../navbar/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import Pomodoro from "@/pomodoro";
import ShortBreak from "@/short";
import LongBreak from "@/long";

import { useEffect, useState } from "react";
import TodoWrapper from "@/todolist/TodoWrapper";
import { useColor } from "@/components/ColorContex";

type Props = {
  selectedPage: SelectedPage;
  isTopOfPage: boolean;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero: React.FC<Props> = ({
  selectedPage,

  setSelectedPage,
}: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");
  const { selectedColor } = useColor();
  const [remainingTime, setRemainingTime] = useState<number>(25 * 60);

  useEffect(() => {
    let timer: NodeJS.Timeout;

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
    <div className="flex items-center justify-center p-2">
      <div
        className={`${selectedColor} flex h-[36rem] mt-0 flex-col items-center justify-center pt-2 p-10 ${
          isAboveMediumScreens ? "w-5/6" : "w-full"
        }  rounded-sm text-white absolute`}>
        <div className="flex  flex-col items-center justify-center p-2 bg-gradient-to-b from-pink-600 via-pink-500 to-pink-400">
          <div className="flex flex-row m-2">
            <button
              className="m-1 xs:m-2 xs:p-1 bg-white bg-opacity-50 rounded xs:mx-1 xs:text-xs active:bg-slate-400 focus-within:bg-slate-400 hover:bg-slate-400 "
              onClick={() => setSelectedPage(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="my-1 xs:my-2 xs:py-1  bg-white bg-opacity-50  rounded xs:mx-1 xs:text-xs focus-within:bg-slate-400 hover:bg-slate-400 active:bg-slate-400"
              onClick={() => setSelectedPage(SelectedPage.ShortBreak)}>
              <Link
                page="ShortBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="m-1 xs:m-2 xs:p-1  rounded xs:mx-1 xs:text-xs bg-white bg-opacity-50 focus-within:bg-slate-400 hover:bg-slate-400 active:bg-slate-400"
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
        <div className="flex flex-wrapper bg-gray-200 p-3 m-1 rounded-sm h-[19rem] shadow-lg">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
};

export default Hero;
