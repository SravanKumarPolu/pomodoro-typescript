// Timer.tsx

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
    <div className="w-auto p-2 ">
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
