// Timer.tsx
import React from "react";
import TimerSvg from "@/assets/Timer.svg";

import ShortBreak from "./ShortBreak";
import LongBreak from "./LongBreak";
import Pomodoros from "./Pomodoros";
import { SelectedPage } from "@/shared/types";

type Props = {};

const Timer = () => {
  const setSelectedPage = (value: SelectedPage) => {
    console.log("Setting selected page:", value);
  };

  const setPomodoroTime = (newTime: number) => {
    console.log("Setting Pomodoro time:", newTime);
  };

  const setShortBreakTime = (newTime: number) => {
    console.log("Setting Short Break time:", newTime);
  };

  const setLongBreakTime = (newTime: number) => {
    console.log("Setting Long Break time:", newTime);
  };

  return (
    <div className="w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row ">
        <img src={TimerSvg} width={20} height={20} />
        <h2>Timer</h2>
      </div>
      <div className="flex flex-row gap-2">
        <Pomodoros
          setSelectedPage={setSelectedPage}
          setPomodoroTime={setPomodoroTime}
        />
        <ShortBreak
          setShortBreakTime={setShortBreakTime}
          setSelectedPage={setSelectedPage}
        />
        <LongBreak
          setLongBreakTime={setLongBreakTime}
          setSelectedPage={setSelectedPage}
        />
      </div>
    </div>
  );
};

export default Timer;
