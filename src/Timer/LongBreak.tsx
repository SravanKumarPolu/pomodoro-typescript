import React, { useState } from "react";

type Props = {
  setLongBreakTime: (newTime: number) => void;
};

const LongBreak = ({ setLongBreakTime }: Props) => {
  const [newTime, setNewTime] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTime(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const seconds = parseInt(newTime) * 60;
    if (!isNaN(seconds) && seconds > 0) {
      setLongBreakTime(seconds);
    }

    setNewTime("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-400 font-weight-500">Long Break</h2>
        <input
          className="w-[6rem] h-[2rem] bg-gray-200 rounded-md"
          type="number"
          placeholder="Enter minutes"
          value={newTime}
          onChange={handleInputChange}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default LongBreak;
