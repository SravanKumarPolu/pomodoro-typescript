// Timer.tsx
import React from "react";
import TimerSvg from "@/assets/Timer.svg";
import Pomodoro from "./Pomodoro";
import ShortBreak from "./ShortBreak";

type Props = {};

const Timer = () => {
  const setPomodoroTime = (newTime: number) => {
    console.log("Setting Pomodoro time:", newTime);
  };

  const setShortBreakTime = (newTime: number) => {
    console.log("Setting Pomodoro time:", newTime);
  };

  return (
    <div className="w-[20rem] p-2">
      <div className="flex flex-row p-1">
        <img src={TimerSvg} width={20} height={20} />
        <h2>Timer</h2>
      </div>
      <div className="flex flex-row gap-2">
        <Pomodoro setPomodoroTime={setPomodoroTime} />
        <ShortBreak setShortBreakTime={setShortBreakTime} />
      </div>
    </div>
  );
};

export default Timer;
