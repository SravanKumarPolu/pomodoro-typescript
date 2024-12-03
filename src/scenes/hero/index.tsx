import LongBreak from "@/long";
import Pomodoro from "@/pomodoro";
import { SelectedPage } from "@/shared/types";
import ShortBreak from "@/short";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";
import { useState } from "react";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero: React.FC<Props> = ({ selectedPage, setSelectedPage }: Props) => {
  const { selectedColor } = useColor();
  const { isDarkMode } = useDarkMode();

  // Allow `null` as a valid state value for `selectedTimer`
  const [selectedTimer, setSelectedTimer] = useState<SelectedPage | null>(
    SelectedPage.Pomodoro
  );

  const timers = [
    { label: "Pomodoro", value: SelectedPage.Pomodoro },
    { label: "Short Break", value: SelectedPage.ShortBreak },
    { label: "Long Break", value: SelectedPage.LongBreak },
  ];

  return (
    <div className="flex justify-center items-center w-screen h-screen mt-[5rem]">
      <div
        className={`flex  flex-col items-center w-full max-w-2xl rounded-lg shadow-lg  p-6 ${
          isDarkMode ? "bg-slate-700 text-white" : `bg-${selectedColor}`
        }`}>
        {/* Tab Navigation */}
        <div
          role="tablist"
          className="flex flex-col md:flex-row lg:flex-row justify-center gap-4 mb-6 border-b-0 md:border-b md:border-gray-300">
          {timers.map((timer) => (
            <button
              key={timer.label}
              role="tab"
              className={`px-4 py-2 font-semibold border-b-2 ${
                selectedTimer === timer.value
                  ? "border-primary text-white "
                  : "border-transparent text-border-gray-200 hover:text-secondary hover:border-gray-300"
              }`}
              onClick={() => setSelectedTimer(timer.value)}>
              {timer.label}
            </button>
          ))}
        </div>

        {/* Timer Content */}
        <div
          className={`flex flex-col items-center justify-center w-full h-full gap-4 rounded-lg shadow-md ${
            isDarkMode
              ? "bg-gray-800 text-white"
              : "bg-gradient-to-b from-${selectedColor} via-${selectedColor} to-${selectedColor}"
          }`}>
          <section className="flex  justify-center items-center w-full h-full">
            {selectedTimer === SelectedPage.Pomodoro && (
              <Pomodoro
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                selectedTimer={selectedTimer}
                setSelectedTimer={setSelectedTimer}
              />
            )}
            {selectedTimer === SelectedPage.ShortBreak && (
              <ShortBreak
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
