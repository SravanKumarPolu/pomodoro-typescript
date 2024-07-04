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
  isTopOfPage: boolean; // Added prop for isTopOfPage
};

const Link = ({
  page,
  src,
  width,
  className,
  height,
  selectedPage,
  setSelectedPage,
  isTopOfPage, // Destructure isTopOfPage from props
}: Props) => {
  const lowerCasePage = page ? page.toLowerCase().replace(/ /g, "") : "";

  const handleClick = () => {
    if (src) {
      setSelectedPage(src as SelectedPage);
    } else {
      setSelectedPage(lowerCasePage as SelectedPage);
    }
  };

  return (
    <AnchorLink
      className={`flex flex-row items-center xl:text-xl ${
        selectedPage === (src || lowerCasePage) ? " " : " "
      }
       transition duration-500 px-[.5px]`}
      href={`#${src || lowerCasePage}`}
      onClick={handleClick}>
      <div>
        {src ? (
          <img
            src={src}
            className={`${className} ${
              isTopOfPage ? "color-white" : "color-black"
            }`}
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
