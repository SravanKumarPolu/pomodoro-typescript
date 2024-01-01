import { SelectedPage } from "@/shared/types";

type LinkProps = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (page: SelectedPage) => void;
  isActive: boolean;
};

const Link: React.FC<LinkProps> = ({
  page,

  setSelectedPage,
  isActive,
}) => {
  return (
    <a
      href="#"
      className={`px-3 bg-white bg-opacity-50 rounded-sm 
      active:bg-slate-400 focus-within:bg-slate-400 hover:bg-slate-400 ${
        isActive ? "active-link" : ""
      }`}
      onClick={() => setSelectedPage(page as SelectedPage)}>
      {page}
    </a>
  );
};

export default Link;
