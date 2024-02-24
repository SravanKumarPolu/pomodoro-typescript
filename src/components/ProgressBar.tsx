import React from "react";
type ProgressBarProps = {
  value: number;
  radius: number;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ value, radius = 60 }) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-center">
        <div className="text-right relative ">
          {/* <span className="text-md font-semibold inline-block text-white absolute mt-11 ml-9 ">
            {value}%
          </span> */}
          <button
            className="relative w-16 align-middle"
            style={{ height: `${2 * radius}px` }}>
            <svg
              height={`${2 * radius}`}
              width={`${2 * radius}`}
              className="relative">
              <circle
                r={radius - 6}
                cx={radius}
                cy={radius}
                stroke="blue"
                strokeWidth="3"
                fill={"transparent"}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}></circle>
            </svg>
          </button>
        </div>
      </div>
      {/* <div className="flex h-[.7rem]  mb-4 overflow-hidden text-xs bg-teal-500 rounded ">
        <div
          style={{ width: `${value}%` }}
          className="flex flex-col justify-center  bg-blue-800 text-xs  text-center whitespace-nowrap text-white">
          {value}%
        </div>
      </div> */}
    </div>
  );
};

export default ProgressBar;
