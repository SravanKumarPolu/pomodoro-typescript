// Setting.tsx
import { SelectedPage } from "@/shared/types";
import removesvg from "@/assets/remove.svg";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Setting = ({}: Props) => {
  return (
    <div
      className="flex flex-col p-2 m-2  mt-10 top-16 absolute right-[17em] bg-white rounded shadow-lg z-10 
      ">
      <div>
        <div className="flex justify-around">
          <h1>Setting</h1>
          <button className="cursor-pointer">
            <img src={removesvg} alt="" />
          </button>
        </div>
        <div>
          <div> Timer</div>
          <div>Task</div>
          <div>Sound</div>
          <div>Themes</div>
          <div>Notifications</div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
