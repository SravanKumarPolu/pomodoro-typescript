import { useEffect, useRef, useState } from "react";

import { SelectedPage } from "@/shared/types";
import Sound from "@/Sound";
import SoundSvg from "@/assets/sound.svg";
import Task from "@/Task";
import TaskSvg from "@/assets/task.svg";
import Theme from "@/Theme";
import ThemeSvg from "@/assets/theme.svg";
import Timer from "@/Timer";
import TimerSvg from "@/assets/Timer.svg";
import removesvg from "@/assets/remove.svg";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  onClose: () => void;
};

const Setting = ({ onClose }: Props) => {
  const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
  const settingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingRef.current &&
        !settingRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const toggleAccordion = (section: string) => {
    setAccordionOpen((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <div
        ref={settingRef}
        id="setting"
        className="absolute z-20 p-4 pt-0 flex flex-col justify-center sm:justify-start items-center 
             w-full max-w-xs sm:w-full md:max-w-md lg:max-w-lg shadow-lg rounded-md">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h1 className="text-xl font-semibold text-gray-700">Settings</h1>
            <button
              onClick={onClose}
              className="focus:outline-none hover:bg-gray-200 p-2 rounded-full transition">
              <img
                width={24}
                height={24}
                src={removesvg}
                alt="Close"
                className="filter grayscale hover:grayscale-0"
              />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-6 bg-white">
            {/* Timer Accordion */}
            <div className="border-b border-gray-200 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer transition hover:text-blue-500"
                onClick={() => toggleAccordion("timer")}>
                <div className="flex items-center">
                  <img src={TimerSvg} width={20} height={20} alt="Timer" />
                  <h2 className="ml-3 text-lg font-medium text-gray-700">
                    Timer
                  </h2>
                </div>
                <span
                  className={`transform transition-transform ${
                    accordionOpen === "timer" ? "rotate-90" : "rotate-0"
                  }`}>
                  ▼
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all ${
                  accordionOpen === "timer" ? "max-h-screen mt-4" : "max-h-0"
                }`}>
                <Timer />
              </div>
            </div>

            {/* Task Accordion */}
            <div className="border-b border-gray-200 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer transition hover:text-blue-500"
                onClick={() => toggleAccordion("task")}>
                <div className="flex items-center">
                  <img src={TaskSvg} width={20} height={20} alt="Task" />
                  <h2 className="ml-3 text-lg font-medium text-gray-700">
                    Task
                  </h2>
                </div>
                <span
                  className={`transform transition-transform ${
                    accordionOpen === "task" ? "rotate-90" : "rotate-0"
                  }`}>
                  ▼
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all ${
                  accordionOpen === "task" ? "max-h-screen mt-4" : "max-h-0"
                }`}>
                <Task label="" />
              </div>
            </div>

            {/* Sound Accordion */}
            <div className="border-b border-gray-200 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer transition hover:text-blue-500"
                onClick={() => toggleAccordion("sound")}>
                <div className="flex items-center">
                  <img src={SoundSvg} width={20} height={20} alt="Sound" />
                  <h2 className="ml-3 text-lg font-medium text-gray-700">
                    Sound
                  </h2>
                </div>
                <span
                  className={`transform transition-transform ${
                    accordionOpen === "sound" ? "rotate-90" : "rotate-0"
                  }`}>
                  ▼
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all ${
                  accordionOpen === "sound" ? "max-h-screen mt-4" : "max-h-0"
                }`}>
                <Sound />
              </div>
            </div>

            {/* Theme Accordion */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer transition hover:text-blue-500"
                onClick={() => toggleAccordion("theme")}>
                <div className="flex items-center">
                  <img src={ThemeSvg} width={20} height={20} alt="Theme" />
                  <h2 className="ml-3 text-lg font-medium text-gray-700">
                    Theme
                  </h2>
                </div>
                <span
                  className={`transform transition-transform ${
                    accordionOpen === "theme" ? "rotate-90" : "rotate-0"
                  }`}>
                  ▼
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all ${
                  accordionOpen === "theme" ? "max-h-screen mt-4" : "max-h-0"
                }`}>
                <Theme label="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
