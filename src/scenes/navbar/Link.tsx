// Link.tsx
import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page?: string;
  src?: string;
  width?: number;
  height?: number;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({
  page,
  src,
  width,
  height,
  selectedPage,
  setSelectedPage,
}: Props) => {
  const lowerCasePage = page
    ? (page.toLowerCase().replace(/ /g, "") as SelectedPage)
    : "";

  const handleClick = () => {
    if (src) {
      setSelectedPage(src as SelectedPage);
    } else {
      setSelectedPage(lowerCasePage as SelectedPage);
    }
  };

  return (
    <AnchorLink
      className={`${
        selectedPage === (src || lowerCasePage) ? "text-white " : ""
      }
          transition duration-500 hover:text-gray-300 py-2 px-3
          `}
      href={`#${src || lowerCasePage}`}
      onClick={handleClick}>
      {src ? <img src={src} alt="" width={width} height={height} /> : page}
    </AnchorLink>
  );
};

export default Link;
