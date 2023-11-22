import React, { useState } from "react";
import TaskSvg from "@/assets/task.svg";

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
    <div className="w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row">
        <img src={TaskSvg} width={20} height={20} />
        <h2>Task</h2>
      </div>
      <div>
        <div className="flex items-center mb-4  justify-between">
          <label htmlFor="toggle1">Auto Switch Tasks {label}</label>
          <div
            onClick={handleToggle1}
            className={`w-16 h-8 bg-gray-300 rounded-full corsor-pointer p-1 ${
              isChecked1 ? "bg-green-500" : ""
            }`}>
            <div
              className={`w-6 h-6 bg-white rounded-full shodow-md  transform ${
                isChecked1 ? "translate-x-full" : ""
              }
            transition-tranform duration-500`}></div>
          </div>
        </div>
        <div className="flex items-center mb-4  justify-between">
          <label htmlFor="toggle2">Auto Check Tasks {label}</label>
          <div
            className={`w-16 h-8 bg-gray-300 rounded-full p-1 cursor-pointer ${
              isChecked2 ? "bg-green-500" : ""
            }`}
            onClick={handleToggle2}>
            <div
              className={`w-6 h-6 bg-white rounded-full 
            shadow-md transform
            ${isChecked2 ? "translate-x-full" : ""} 
                transition-transform duration-500 `}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
