import React from "react";

type ProgressBarProps = {
  value: number; // Change the type to number for percentage
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-center">
        <div className="text-right ">
          <span className="text-md font-semibold inline-block text-white ">
            {value}%
          </span>
          <svg height="100" width="100" className="relative">
            <circle
              r={radius}
              cx="50"
              cy="50"
              stroke="blue"
              strokeWidth="3"
              fillOpacity={0.34}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}></circle>
            <span className="absolute">{value}%</span>
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
};
export default ProgressBar;
