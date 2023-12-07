import React, { useState } from "react";
import ThemeSvg from "@/assets/theme.svg";
import removesvg from "@/assets/remove.svg";
type Props = {};

const Popup = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-[2rem] z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative  flex flex-col w-full  bg-gray-300 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <button
                  className="p-1 ml-auto  border-0  text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}>
                  <span className="text-red h-6 w-6  text-2xl block outline-none focus:outline-none">
                    <img
                      width={24}
                      height={24}
                      src={removesvg}
                      alt=""
                      className="filter grayscale bg-red "
                    />
                  </span>
                </button>
              </div>
              <div className="relative p-6  flex-auto">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Themes = ({}: Props) => {
  const [showAllColors, setShowAllColors] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

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

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="flex flex-col w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row p-1 gap-1">
        <img src={ThemeSvg} width={15} height={15} />
        <h2>Theme</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between my-2">
          <h3>Color Themes</h3>
          <div className="flex   flex-wrap flex-row gap-1">
            {displayedColors.map((color, index) => (
              <button
                key={index}
                className={`w-5 h-5  rounded ${color}`}
                onClick={openPopup}
              />
            ))}
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        {/* Content of your popup goes here */}
        <div className="flex w-[13rem]   flex-wrap flex-row gap-1">
          {allColorButtons.map((color, index) => (
            <button key={index} className={`w-14 h-14  rounded ${color}`} />
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default Themes;
