import { SelectedPage } from "@/shared/types";
import { useEffect } from "react";

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
  // Ensure the lowerCasePage is of type SelectedPage
  const lowerCasePage = page
    ? (page.toLowerCase().replace(/ /g, "") as SelectedPage)
    : null;

  const handleClick = () => {
    // Ensure `src` or `lowerCasePage` are valid SelectedPage values
    if (src) {
      setSelectedPage(src as SelectedPage);
    } else if (lowerCasePage) {
      setSelectedPage(lowerCasePage);
    }
  };

  useEffect(() => {
    const smoothScrollTo = (targetElement: HTMLElement | null) => {
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    };

    const targetElement = document.getElementById(
      src || (lowerCasePage as string)
    );
    smoothScrollTo(targetElement);
  }, [src, lowerCasePage]);

  return (
    <a
      id={`${src || lowerCasePage}-link`}
      className={`flex items-center xl:text-xl ${
        selectedPage === (src || lowerCasePage) ? "text-white" : "text-gray-400"
      } transition duration-500 px-[.5px] ${className}`}
      href={`#${src || lowerCasePage}`}
      onClick={handleClick}>
      {src ? (
        <img
          src={src}
          className={className}
          alt=""
          width={width}
          height={height}
        />
      ) : (
        <span>{page}</span>
      )}
    </a>
  );
};

export default Link;
