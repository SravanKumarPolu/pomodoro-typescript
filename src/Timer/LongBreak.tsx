import { useTimerContext } from "@/components/TimerContext";
import { SelectedPage } from "@/shared/types";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;

  selectedPage?: SelectedPage;
  setShortBreakTime: (newTime: number) => void;
};

const LongBreak = ({}: Props) => {
  const { timerValue3, handleTimerChange3 } = useTimerContext();

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="timerValue" className="text-gray-400 font-weight-500">
          Long Break
        </label>
        <input
          type="number"
          id="timerValue"
          value={timerValue3}
          onChange={(e) => handleTimerChange3(parseInt(e.target.value))}
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default LongBreak;
