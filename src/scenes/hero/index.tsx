// Hero.tsx

import { useEffect, useState } from "react";

import LongBreak from "@/long";
import Pomodoro from "@/pomodoro";
import { SelectedPage } from "@/shared/types";
import ShortBreak from "@/short";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";

type Props = {
  selectedPage: SelectedPage;

  setSelectedPage: (value: SelectedPage) => void;
};

const Hero: React.FC<Props> = ({ selectedPage, setSelectedPage }: Props) => {
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
    <div className="flex justify-center items-center mt-[6rem] w-screen h-screen">
      <div
        className={`flex flex-col ${
          isDarkMode ? "bg-slate-700" : selectedColor
        } h-full py-9 items-center rounded-sm text-white relative`}>
        {/* Tab Navigation */}
        <div role="tablist" className="flex border-b border-gray-300 mb-6">
          <button
            role="tab"
            className={`px-4 py-2 border-b-2 ${
              selectedTimer === SelectedPage.Pomodoro
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-secondary hover:text-text-secondary hover:border-gray-300 transition-all"
            }`}
            onClick={() => setSelectedTimer(SelectedPage.Pomodoro)}>
            Pomodoro
          </button>
          <button
            role="tab"
            className={`px-4 py-2 border-b-2 ${
              selectedTimer === SelectedPage.ShortBreak
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-secondary hover:text-text-secondary hover:border-gray-300 transition-all"
            }`}
            onClick={() => setSelectedTimer(SelectedPage.ShortBreak)}>
            Short Break
          </button>
          <button
            role="tab"
            className={`px-4 py-2 border-b-2 ${
              selectedTimer === SelectedPage.LongBreak
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-secondary hover:text-text-secondary0 hover:border-gray-300 transition-all"
            }`}
            onClick={() => setSelectedTimer(SelectedPage.LongBreak)}>
            Long Break
          </button>
        </div>

        {/* Timer Content */}
        <div
          className={`flex flex-col rounded shadow-md w-5/6 h-5/6 items-center justify-center gap-4 md:mb-5 md:gap-10 ${
            isDarkMode
              ? "bg-white-700"
              : "pb-4 bg-gradient-to-b from-gray-600 via-pink-400 to-selectedColor-400"
          }`}>
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
                selectedTimer={selectedTimer}
                setSelectedTimer={setSelectedTimer}
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
