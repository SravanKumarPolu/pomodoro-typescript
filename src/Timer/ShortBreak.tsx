import { useTimerContext } from "@/components/ShortTimerContext";
import { SelectedPage } from "@/shared/types";
import { useEffect, useState } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;

  selectedPage?: SelectedPage;
  setShortBreakTime: (newTime: number) => void;
};

const ShortBreak = ({}: Props) => {
  const { timerValue, handleTimerChange } = useTimerContext();

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="timerValue" className="text-gray-400 font-weight-500">
          Short Break
        </label>
        <input
          type="number"
          id="timerValue"
          value={timerValue}
          onChange={(e) => handleTimerChange(parseInt(e.target.value))}
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default ShortBreak;
