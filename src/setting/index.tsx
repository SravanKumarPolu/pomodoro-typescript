// Setting.tsx
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Setting = ({}: Props) => {
  return (
    <div
      className="w-[20rem] h-[20rem] bg-white  absolute 
      ">
      <div> Settings</div>
      <p>para1</p>
      <p>para2</p>
    </div>
  );
};

export default Setting;
