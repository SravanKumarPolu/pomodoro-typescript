import React, { useState } from "react";
import ThemeSvg from "@/assets/theme.svg";

type Props = {};

const Themes = ({}: Props) => {
  const [showAllColors, setShowAllColors] = useState(false);

  const colorButtons = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-violet-400",
    "bg-orange-400",
  ];

  const allColorButtons = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-violet-400",
    "bg-orange-400",
    "bg-indigo-400",
    "bg-amber-500",
    "bg-emerald-400",
    "bg-purple-400",
  ];

  const displayedColors = showAllColors ? allColorButtons : colorButtons;

  return (
    <div className="flex flex-col w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row p-1 gap-1">
        <img src={ThemeSvg} width={15} height={15} />
        <h2>Theme</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h3>Color Themes</h3>
          <div className="flex w-36 flex-wrap flex-row gap-2">
            {displayedColors.map((color, index) => (
              <button key={index} className={`w-5 h-5 rounded ${color}`} />
            ))}
            {!showAllColors && (
              <button
                className="w-5 h-5 rounded bg-gray-300"
                onClick={() => setShowAllColors(true)}>
                +
              </button>
            )}
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
};

export default Themes;
