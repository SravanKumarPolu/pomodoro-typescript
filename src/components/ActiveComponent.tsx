import { SelectedPage } from "@/shared/types";

type LinkProps = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (page: SelectedPage) => void;
  isActive: boolean;
};

const Link: React.FC<LinkProps> = ({ page, setSelectedPage, isActive }) => {
  return (
    <a
      href="#"
      className={`block px-6 xs:px-4 py-2 md:py-1 bg-white bg-opacity-50 rounded-sm 
      active:bg-slate-400 focus-within:bg-slate-400 hover:bg-slate-400 ${
        isActive ? "text-black" : "text-white"
      }`}
      onClick={() => setSelectedPage(page as SelectedPage)}
      style={{
        minWidth: "200px", // Adjust as needed
        maxWidth: "400px", // Adjust as needed
        minHeight: "40px", // Adjust as needed
        maxHeight: "80px", // Adjust as needed
      }}>
      <span className="text-base md:text-lg lg:text-xl xl:text-2xl">
        {page}
      </span>
    </a>
  );
};

export default Link;
