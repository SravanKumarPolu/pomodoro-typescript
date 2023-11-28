// Setting.tsx
import { SelectedPage } from "@/shared/types";
import removesvg from "@/assets/remove.svg";
import Timer from "@/Timer";
import Task from "@/Task";
import Sound from "@/Sound";
import Theme from "@/Theme";
import Notifications from "@/notification";
import { SoundProvider } from "@/components/SoundContext";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  onClose: () => void;
};

const Setting = ({ onClose }: Props) => {
  return (
    <div className="w-[24rm]  z-10 absolute p-4 m-2 mt-10 top-11 sm:w-[24rem] sm:right-[4rem] sm:fixed">
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
        <div className="p-4">
          <Timer />
          <Task label={""} />

          <Sound />

          <Theme />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Setting;
