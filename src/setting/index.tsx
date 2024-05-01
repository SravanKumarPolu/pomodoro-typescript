// Setting.tsx
import { useState } from "react";
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

  const toggleAccordion = (section: string) => {
    setAccordionOpen((prev) => (prev === section ? null : section));
  };

  return (
    <div className="w-[22rem] sm:w-[20rem] md:w-[24rem] lg:w-[30rem] xl:w-[35rem] 2xl:w-[40rem] z-10 fixed p-4 m-2 mt-24 top-11 sm:mt-10 sm:right-[4rem] sm:fixed">
      <div className="bg-white rounded shadow-lg">
        <div className="flex justify-between p-4 border-b-2 border-white-500">
          <h1 className="text-lg font-semibold">Setting</h1>
          <button className="cursor-pointer" onClick={onClose}>
            <img
              width={24}
              height={24}
              src={removesvg}
              alt=""
              className="filter grayscale"
            />
          </button>
        </div>
        <div className="p-4 flex flex-col">
          <div className="border-b-2 border-white-500 p-1 ">
            <div
              className="flex flex-row p-1 cursor-pointer"
              onClick={() => toggleAccordion("timer")}>
              <img src={TimerSvg} width={20} height={20} />
              <h2>Timer</h2>
            </div>
            <div className={accordionOpen === "timer" ? "block" : "hidden"}>
              <Timer />
            </div>
          </div>

          <div className="border-b-2 border-white-500 p-1">
            <div
              className="flex flex-row p-1 cursor-pointer"
              onClick={() => toggleAccordion("task")}>
              <img src={TaskSvg} width={20} height={20} />
              <h2>Task</h2>
            </div>
            <div className={accordionOpen === "task" ? "block" : "hidden"}>
              <Task label={""} />
            </div>
          </div>

          <div className="border-b-2 border-white-500 p-1">
            <div
              className="flex flex-row p-1  cursor-pointer"
              onClick={() => toggleAccordion("sound")}>
              <img src={SoundSvg} width={20} height={20} />
              <h2 className="ml-1">Sound</h2>
            </div>
            <div className={accordionOpen === "sound" ? "block" : "hidden"}>
              <Sound />
            </div>
          </div>

          <div className="border-b-2 border-white-500 p-1">
            <div
              className="flex flex-row p-1 gap-1 cursor-pointer"
              onClick={() => toggleAccordion("theme")}>
              <img src={ThemeSvg} width={15} height={15} />
              <h2>Theme</h2>
            </div>
            <div className={accordionOpen === "theme" ? "block" : "hidden"}>
              <Theme label={""} />
            </div>
          </div>

          {/* <Notifications /> */}
        </div>
      </div>
    </div>
  );
};

export default Setting;
