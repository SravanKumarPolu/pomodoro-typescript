import React, { useState } from "react";

import removesvg from "@/assets/remove.svg";
import { useColor } from "@/components/ColorContex";
import { useDarkMode } from "@/components/DarkModeContext";
type Props = {
  label: string;
};

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
        <div className="fixed bottom-[2rem] z-10  flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="relative  flex flex-col w-full  bg-gray-100 border-0 rounded-lg shadow-lg outline-none focus:outline-none">
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

const Themes = ({ label }: Props) => {
  const [showAllColors] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { colorButtons, allColorButtons, setSelectedColor } = useColor();

  const displayedColors = showAllColors ? allColorButtons : colorButtons;
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log("hie");
  };
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const handleColorButtonClick = (color: string) => {
    setSelectedColor(color);

    closePopup(); // Close the popup when a color is selected
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className="flex flex-col w-[20rem] p-2 border-b-2 border-white-500">
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
        <div className="flex flex-row justify-between py-2">
          <label htmlFor="toggle1">Dark mode</label>
          <div
            onClick={toggleDarkMode}
            className={`w-16 h-8 bg-gray-300 rounded-full cursor-pointer p-1 ${
              isDarkMode ? "bg-gray-700" : ""
            }`}>
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform ${
                isDarkMode ? "translate-x-full" : ""
              } transition-transform duration-500`}></div>
          </div>
        </div>
      </div>

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        {/* Content of your popup goes here */}
        <div className="flex w-[13rem]   flex-wrap flex-row gap-1">
          {allColorButtons.map((color, index) => (
            <button
              onClick={() => handleColorButtonClick(color)}
              key={index}
              className={`w-14 h-14  rounded ${color}`}
            />
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default Themes;
