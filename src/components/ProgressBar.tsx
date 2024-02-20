import React from "react";

type ProgressBarProps = {
  value: number; // Change the type to number for percentage
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-center">
      <div className="text-right ">
        <span className="text-md font-semibold inline-block text-white ">
          {value}%
        </span>
        <svg height="100" width="100">
          <circle
            r="45"
            cx="50"
            cy="50"
            stroke="green"
            strokeWidth="3"
            fill="transparent"
          />{" "}
        </svg>
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
