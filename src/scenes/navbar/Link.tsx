// Link.tsx
import { SelectedPage } from "@/shared/types";

import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page?: string;
  src?: string;
  width?: number;
  className?: string;
  height?: number;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({
  page,
  src,
  width,
  className,
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
      className={`flex flex-row items-center md:text-xl md:py-2 ${
        selectedPage === (src || lowerCasePage) ? "text-white " : "text-white "
      }
       transition duration-500 py-1 px-[.5px]`}
      href={`#${src || lowerCasePage}`}
      onClick={handleClick}>
      <div>
        {src ? (
          <img
            src={src}
            className={className}
            alt=""
            width={width}
            height={height}
          />
        ) : (
          page
        )}
      </div>
    </AnchorLink>
  );
};

export default Link;
