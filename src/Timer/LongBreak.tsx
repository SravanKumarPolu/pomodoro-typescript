import { SelectedPage } from "@/shared/types";
import React, { useEffect, useState } from "react";

type Props = {
  setLongBreakTime: (newTime: number) => void;
  setSelectedPage: (value: SelectedPage) => void;

  selectedPage?: SelectedPage;
};

const LongBreak = ({
  setLongBreakTime,
  setSelectedPage,
  selectedPage,
}: Props) => {
  const [newTime, setNewTime] = useState("");
  const [time, setTime] = useState(15 * 60);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seconds = parseInt(newTime) * 60;
    if (!isNaN(seconds) && seconds > 0) {
      setLongBreakTime(seconds);
    }

    setNewTime("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-400 font-weight-500">Long Break</h2>
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

export default LongBreak;
