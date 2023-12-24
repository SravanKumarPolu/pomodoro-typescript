import React from "react";

type ProgressBarProps = {
  value: number; // Change the type to number for percentage
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-center">
      <div className="text-right ">
        <span className="text-xs font-semibold inline-block text-white ">
          {value}%
        </span>
      </div>
    </div>
    <div className="flex h-[.7rem]  mb-4 overflow-hidden text-xs bg-teal-500 rounded ">
      <div
        style={{ width: `${value}%` }}
        className="flex flex-col justify-center  bg-blue-800 text-xs  text-center whitespace-nowrap text-white">
        {value}%
      </div>
    </div>
  </div>
);

export default ProgressBar;
