import { SelectedPage } from "@/shared/types";

type LinkProps = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (page: SelectedPage) => void;
  isActive: boolean;
};

const Link: React.FC<LinkProps> = ({
  page,
  selectedPage,
  setSelectedPage,
  isActive,
}) => {
  return (
    <a
      href="#"
      className={`text-white ${isActive ? "active-link" : ""}`}
      onClick={() => setSelectedPage(page as SelectedPage)}>
      {page}
    </a>
  );
};

export default Link;
