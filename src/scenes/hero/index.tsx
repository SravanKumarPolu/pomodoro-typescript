// Hero.tsx
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import TodoWrapper from "@/todolist/TodoWrapper";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";
import ShortBreak from "@/short";
import Pomodoro from "@/pomodoro";
import LongBreak from "@/long";
import Link from "@/components/ActiveComponent";

type Props = {
  selectedPage: SelectedPage;

  setSelectedPage: (value: SelectedPage) => void;
};

const Hero: React.FC<Props> = ({ selectedPage, setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");
  const { selectedColor } = useColor();
  const { isDarkMode } = useDarkMode();

  const [selectedTimer, setSelectedTimer] = useState<SelectedPage | null>(
    SelectedPage.Pomodoro
  );
  const [, setRemainingTime] = useState<number>(25 * 60);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (selectedTimer !== null) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [selectedTimer]);

  return (
    <div className="flex mt-[6rem] w-screen h-screen">
      <div
        className={`flex flex-row ${
          isDarkMode ? "bg-slate-700" : selectedColor
        } flex h-full py-9 flex-col items-center ${
          isAboveMediumScreens ? "w-full" : "w-full"
        } rounded-sm text-white relative`}>
        <div
          className={`flex flex-col rounded shadow-md w-5/6 h-auto items-center justify-center gap-4 md:mb-5 md:gap-10 ${
            isDarkMode
              ? "bg-white-700"
              : "pb-4 bg-gradient-to-b from-gray-600 via-pink-500 to-selectedColor-400"
          }`}>
          <section className="flex flex-col sm:flex-col md:flex-row xl:flex-row m-2 my-4 gap-4 xs:my-2 py-2 px-4 xs:flex-row">
            <button
              className={`text-white md:text-lg md:w-48 ${
                isAboveMediumScreens ? "w-full" : "w-full"
              } ${isAboveMediumScreens ? "h-12" : "h-10"} `}
              onClick={() => setSelectedTimer(SelectedPage.ShortBreak)}>
              <Link
                page="Short Break"
                isActive={selectedTimer === SelectedPage.ShortBreak}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className={`text-white md:text-lg md:w-48 font-helvetica  `}
              onClick={() => setSelectedTimer(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                isActive={selectedTimer === SelectedPage.Pomodoro}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className={`text-white md:text-lg md:w-48 ${
                isAboveMediumScreens ? "w-full" : "w-full"
              } ${isAboveMediumScreens ? "h-12" : "h-10"} `}
              onClick={() => setSelectedTimer(SelectedPage.LongBreak)}>
              <Link
                page="Long Break"
                isActive={selectedTimer === SelectedPage.LongBreak}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </section>

          <section className="flex justify-center flex-wrapper pt-2">
            {selectedTimer === SelectedPage.ShortBreak && (
              <ShortBreak
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                selectedTimer={selectedTimer}
                setSelectedTimer={setSelectedTimer}
              />
            )}
            {selectedTimer === SelectedPage.Pomodoro && (
              <Pomodoro
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                selectedTimer={selectedTimer} // Pass selectedTimer as prop
                setSelectedTimer={setSelectedTimer} // Pass setSelectedTimer as prop
              />
            )}
            {selectedTimer === SelectedPage.LongBreak && (
              <LongBreak
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                selectedTimer={selectedTimer}
                setSelectedTimer={setSelectedTimer}
              />
            )}
          </section>

          <section className="flex justify-center flex-wrapper pt-2">
            <TodoWrapper />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;
