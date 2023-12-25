import { useTimerContext } from "@/components/TimerContext";

const LongBreak = () => {
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
          className="w-[5.5rem] h-[2rem] bg-gray-200 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default LongBreak;
