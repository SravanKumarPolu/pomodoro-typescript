import { SelectedPage } from "@/shared/types";
import Link from "../navbar/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import Pomodoro from "@/pomodoro";
import ShortBreak from "@/short";
import LongBreak from "@/long";

import { useEffect, useState } from "react";
import TodoWrapper from "@/todolist/TodoWrapper";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";

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
  const { isDarkMode } = useDarkMode();
  return (
    <div className="mt-[6rem] h-screen  ">
      <div
        className={`${isDarkMode ? "bg-slate-700" : selectedColor}
        } flex h-auto  py-9 flex-col items-center justify-center  ${
          isAboveMediumScreens ? "w-full" : "w-full"
        }  rounded-sm text-white absolute`}>
        <div
          className={`flex  flex-col items-center rounded-2xl justify-center p-2 ${
            isDarkMode
              ? "bg-white-700"
              : "bg-gradient-to-b from-gray-600 via-pink-500 to-selectedColor-400"
          }`}>
          <div className="flex flex-col gap-2 py-8 xs:flex-row">
            <button
              className=" px-3 bg-white bg-opacity-50  rounded-sm  focus-within:bg-slate-400 hover:bg-slate-400 active:bg-slate-400"
              onClick={() => setSelectedPage(SelectedPage.ShortBreak)}>
              <Link
                page="Short Break"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="px-3 bg-white bg-opacity-50 rounded-sm 
               active:bg-slate-400 focus-within:bg-slate-400 hover:bg-slate-400 "
              onClick={() => setSelectedPage(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>

            <button
              className=" px-3  rounded-sm  bg-white bg-opacity-50 focus-within:bg-slate-400
               hover:bg-slate-400 active:bg-slate-400"
              onClick={() => setSelectedPage(SelectedPage.LongBreak)}>
              <Link
                page="Long Break"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>
          {renderPage()}
        </div>
        <div className="flex justify-center flex-wrapper pt-2">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
};

export default Hero;
