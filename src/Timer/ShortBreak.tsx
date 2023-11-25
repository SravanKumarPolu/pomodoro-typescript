import { useTimerContext } from "@/components/TimerContext";
import { SelectedPage } from "@/shared/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;

  selectedPage?: SelectedPage;
  setShortBreakTime: (newTime: number) => void;
};

const ShortBreak = ({}: Props) => {
  const { timerValue2, handleTimerChange2 } = useTimerContext();

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="timerValue" className="text-gray-400 font-weight-500">
          Short Break
        </label>
        <input
          type="number"
          id="timerValue"
          value={timerValue2}
          onChange={(e) => handleTimerChange2(parseInt(e.target.value))}
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default ShortBreak;
