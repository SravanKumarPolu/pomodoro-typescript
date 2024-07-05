import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page?: string;
  src?: string;
  width?: number;
  className?: string; // Accept className prop
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
       transition duration-500 px-[.5px] ${className}`} // Apply className here
      href={`#${src || lowerCasePage}`}
      onClick={handleClick}>
      {src ? (
        <img
          src={src}
          className={`${className}`} // Use className here
          alt=""
          width={width}
          height={height}
        />
      ) : (
        <div>{page}</div>
      )}
    </AnchorLink>
  );
};

export default Link;
