import { SelectedPage } from "@/shared/types";

import useMediaQuery from "@/hooks/useMediaQuery";
import Pomodoro from "@/pomodoro";
import ShortBreak from "@/short";
import LongBreak from "@/long";

import { useEffect, useState } from "react";
import TodoWrapper from "@/todolist/TodoWrapper";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";
import Link from "@/components/ActiveComponent";

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
    <div className="mt-[6rem]  w-screen h-screen">
      <div
        className={`${
          isDarkMode ? "bg-slate-700" : selectedColor
        } flex h-full py-9 flex-col items-center  ${
          isAboveMediumScreens ? "w-full" : "w-full"
        } rounded-sm text-white relative`}>
        <div
          className={`flex  w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 h-full  md:h-3/4 lg:h-2/3 xl:h-1/2 2xl:h-1/3 flex-col items-center rounded justify-center ${
            isDarkMode
              ? "bg-white-700"
              : "pb-4 bg-gradient-to-b from-gray-600 via-pink-500 to-selectedColor-400"
          }`}>
          <div className="flex flex-col m-2 my-4 gap-4 xs:my-2 py-2 px-4 xs:flex-row">
            <button
              className="text-white py-2 px-4 rounded-lg w-full xs:w-auto mb-2 xs:mb-0 xs:mr-2"
              onClick={() => setSelectedPage(SelectedPage.ShortBreak)}>
              <Link
                page="Short Break"
                isActive={selectedPage === "ShortBreak"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>

            <button
              className="text-white py-2 px-4 rounded-lg w-full xs:w-auto mb-2 xs:mb-0 xs:mr-2"
              onClick={() => setSelectedPage(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                isActive={selectedPage === "Pomodoro"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>

            <button
              className="text-white py-2 px-4 rounded-lg w-full xs:w-auto"
              onClick={() => setSelectedPage(SelectedPage.LongBreak)}>
              <Link
                page="Long Break"
                isActive={selectedPage === "LongBreak"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>

          {renderPage()}
        </div>
        <div className="flex   justify-center flex-wrapper  pt-2">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
};

export default Hero;
