import ThemeSvg from "@/assets/theme.svg";
type Props = {};

const Themes = ({}: Props) => {
  return (
    <div className="flex flex-col w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row p-1 gap-1">
        <img src={ThemeSvg} width={15} height={15} />

        <h2>Theme</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h3>Color Themes</h3>
          <div className="flex flex-row gap-2">
            <button className=" bg-red-400 w-5 h-5 rounded"></button>
            <button className=" bg-green-400 w-5 h-5 rounded"></button>
            <button className=" bg-blue-400 w-5 h-5 rounded"></button>
            <button className=" bg-violet-400 w-5 h-5 rounded"></button>
            <button className=" bg-orange-400 w-5 h-5 rounded"></button>
            <button className=" bg-indigo-400 w-5 h-5 rounded"></button>
            <button className=" bg-amber-500 w-5 h-5 rounded"></button>
            <button className=" bg-emerald-400 w-5 h-5 rounded"></button>
            <button className=" bg-purple-400 w-5 h-5 rounded"></button>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
};

export default Themes;
