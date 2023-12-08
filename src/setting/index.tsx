// Setting.tsx
import { SelectedPage } from "@/shared/types";
import removesvg from "@/assets/remove.svg";
import Timer from "@/Timer";
import Task from "@/Task";
import Sound from "@/Sound";
import Theme from "@/Theme";
import TaskSvg from "@/assets/task.svg";
import ThemeSvg from "@/assets/theme.svg";
import SoundSvg from "@/assets/sound.svg";
import Notifications from "@/notification";
import TimerSvg from "@/assets/Timer.svg";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  onClose: () => void;
};

const Setting = ({ onClose }: Props) => {
  return (
    <div className="w-[24rm]  z-10 fixed p-4  m-2 mt-24 top-11 sm:mt-10 sm:w-[24rem] sm:right-[4rem] sm:fixed">
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
        <div className="p-4 flex flex-col ">
          <div>
            <div className="flex flex-row ">
              <img src={TimerSvg} width={20} height={20} />
              <h2>Timer</h2>
            </div>
            <Timer />
          </div>

          <div>
            <div className="flex flex-row">
              <img src={TaskSvg} width={20} height={20} />
              <h2>Task</h2>
            </div>
            <Task label={""} />
          </div>

          <div>
            <div className="flex flex-row p-1">
              <img src={SoundSvg} width={20} height={20} />
              <h2 className="ml-1">Sound</h2>
            </div>
            <Sound />
          </div>

          <div>
            <div className="flex flex-row p-1 gap-1">
              <img src={ThemeSvg} width={15} height={15} />
              <h2>Theme</h2>
            </div>
            <Theme label={""} />
          </div>

          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Setting;
