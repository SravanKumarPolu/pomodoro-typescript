import { useState, useRef, useEffect } from "react";
import { SelectedPage } from "@/shared/types";
import removesvg from "@/assets/remove.svg";
import Timer from "@/Timer";
import Task from "@/Task";
import Sound from "@/Sound";
import Theme from "@/Theme";
import TaskSvg from "@/assets/task.svg";
import ThemeSvg from "@/assets/theme.svg";
import SoundSvg from "@/assets/sound.svg";
import TimerSvg from "@/assets/Timer.svg";

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
    <div
      ref={settingRef}
      className="absolute z-20 p-4 m-4 mt-24 top-11 right-0 sm:mt-10 sm:right-[2rem] md:right-[3rem] lg:right-[7rem] xl:right-[10rem]
       2xl:right-[14.3rem]  w-[21.5rem] sm:w-[24rem] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] 2xl:w-[26rem] shadow-sm">
      <div className="bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Settings</h1>
          <button onClick={onClose} className="focus:outline-none">
            <img
              width={24}
              height={24}
              src={removesvg}
              alt="Close"
              className="filter grayscale"
            />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="border-b border-gray-200 pb-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleAccordion("timer")}>
              <img src={TimerSvg} width={20} height={20} alt="Timer" />
              <h2 className="ml-2 text-lg font-medium">Timer</h2>
            </div>
            <div
              className={accordionOpen === "timer" ? "block mt-2" : "hidden"}>
              <Timer />
            </div>
          </div>

          <div className="border-b border-gray-200 pb-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleAccordion("task")}>
              <img src={TaskSvg} width={20} height={20} alt="Task" />
              <h2 className="ml-2 text-lg font-medium">Task</h2>
            </div>
            <div className={accordionOpen === "task" ? "block mt-2" : "hidden"}>
              <Task label={""} />
            </div>
          </div>

          <div className="border-b border-gray-200 pb-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleAccordion("sound")}>
              <img src={SoundSvg} width={20} height={20} alt="Sound" />
              <h2 className="ml-2 text-lg font-medium">Sound</h2>
            </div>
            <div
              className={accordionOpen === "sound" ? "block mt-2" : "hidden"}>
              <Sound />
            </div>
          </div>

          <div className="pb-2">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleAccordion("theme")}>
              <img src={ThemeSvg} width={20} height={20} alt="Theme" />
              <h2 className="ml-2 text-lg font-medium">Theme</h2>
            </div>
            <div
              className={accordionOpen === "theme" ? "block mt-2" : "hidden"}>
              <Theme label={""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
