import Pomodoro from "@/pomodoro/TimerComponents";
import { SelectedPage } from "@/shared/types";
import { useEffect, useState } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;

  selectedPage?: SelectedPage;
  setShortBreakTime: (newTime: number) => void;
};

const Pomodoros = ({
  setSelectedPage,
  setShortBreakTime,
  selectedPage,
}: Props) => {
  const [newTime, setNewTime] = useState("");
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setTime(25 * 60);

      setSelectedPage(selectedPage || SelectedPage.Pomodoro);
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage, selectedPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seconds = parseInt(newTime) * 60;
    if (!isNaN(seconds) && seconds > 0) {
      setShortBreakTime(seconds);
    }

    setNewTime("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-400 font-weight-500">Short Break</h2>
        <input
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md p-1"
          type="number"
          placeholder="Enter minutes"
          defaultValue={time / 60}
          onChange={handleInputChange}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default Pomodoro;
