import React from "react";
type ProgressBarProps = {
  value: number;
};
const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="relative pt-1 w-auto h-auto">
      <div className="flex flex-col   items-center justify-center">
        <div className="flex h-[.7rem] w-[99%] mb-4 relative text-center overflow-hidden text-xs bg-teal-500 rounded ">
          <div
            style={{ width: `${value}%` }}
            className="flex  justify-center  items-center  bg-blue-800 text-xs  text-center whitespace-nowrap text-white">
            <span className="absolute inset-0 text-center  flex items-center justify-center">
              {" "}
              {value}%
            </span>
          </div>
        </div>
        <div>
          <span className="  text-center h-8 flex justify-center items-center">
            {value}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
