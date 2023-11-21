import React, { useState } from "react";

type Props = {
  label: string;
};

const Task = ({ label }: Props) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleToggle1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  return (
    <div className="w-[20rem] p-2">
      <h2>Task</h2>
      <div>
        <div className="flex items-center mb-4  justify-between">
          <label htmlFor="toggle1">Auto Switch Tasks {label}</label>
          <input
            type="checkbox"
            id="toggle1" // Use a unique id
            checked={isChecked1}
            onChange={handleToggle1}
            className="mr-2"
          />
        </div>
        <div className="flex items-center mb-4  justify-between">
          <label htmlFor="toggle2">Auto Check Tasks {label}</label>
          <input
            type="checkbox"
            id="toggle2" // Use a unique id
            checked={isChecked2}
            onChange={handleToggle2}
            className="mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
