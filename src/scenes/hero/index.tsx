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
          <div className="flex flex-col m-2 my-4 gap-2 xs:my-2 py-2 px-4 xs:flex-row">
            <button
              className=" text-white"
              onClick={() => setSelectedPage(SelectedPage.ShortBreak)}>
              <Link
                page="Short Break"
                isActive={selectedPage === "ShortBreak"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="text-white "
              onClick={() => setSelectedPage(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                isActive={selectedPage === "Pomodoro"}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>

            <button
              className=" text-white"
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
        <div className="flex justify-center flex-wrapper  pt-2">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
};

export default Hero;
