// Timer.tsx

import TimerSvg from "@/assets/Timer.svg";
import ShortBreak from "./ShortBreak";

import PomodoroTimer from "./Pomodoros";
import { SelectedPage } from "@/shared/types";
import LongBreak from "./LongBreak";

const Timer = () => {
  const setSelectedPage = (value: SelectedPage) => {
    console.log("Setting selected page:", value);
  };

  const setShortBreakTime = (newTime: number) => {
    console.log("Setting Short Break time:", newTime);
  };

  return (
    <div className="w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row ">
        <img src={TimerSvg} width={20} height={20} />
        <h2>Timer</h2>
      </div>
      <div className="flex flex-row gap-2">
        {/* Pass setSelectedPage as a prop */}
        <PomodoroTimer />
        <ShortBreak
          setShortBreakTime={setShortBreakTime}
          setSelectedPage={setSelectedPage}
        />
        <LongBreak />
      </div>
    </div>
  );
};

export default Timer;
