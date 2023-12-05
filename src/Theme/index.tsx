import ThemeSvg from "@/assets/theme.svg";
type Props = {};

const Themes = ({}: Props) => {
  return (
    <div className="flex flex-col w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row p-1 gap-1">
        <img src={ThemeSvg} width={15} height={15} />

        <h2>Theme</h2>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
};

export default Themes;
