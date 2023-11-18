// Setting.tsx
import { SelectedPage } from "@/shared/types";
import removesvg from "@/assets/remove.svg";
import Timer from "@/Timer";
import Task from "@/Task";
import Sound from "@/Sound";
import Theme from "@/Theme";
import Notifications from "@/notification";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  onClose: () => void;
};

const Setting = ({ onClose }: Props) => {
  return (
    <div
      className="flex flex-col w-[22rem] p-2 m-2  mt-10 top-16 absolute right-[17em] bg-white rounded shadow-lg z-10 
      ">
      <div>
        <div className="flex justify-between p-2 border-b-2 border-white-500">
          <h1>Setting</h1>
          <button className="cursor-pointer" onClick={onClose}>
            <img
              width={24}
              height={24}
              src={removesvg}
              alt=""
              className="filter grayscale "
            />
          </button>
        </div>
        <div>
          <Timer />
          <Task />
          <Sound />
          <Theme />
          <Notifications />
        </div>
      </div>
    </div>
  );
};
export default Setting;
