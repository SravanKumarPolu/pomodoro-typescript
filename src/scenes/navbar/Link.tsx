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

const smoothScrollTo = (targetElement: HTMLElement | null) => {
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  }
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

  useEffect(() => {
    const handleSmoothScroll = () => {
      const targetElement = document.getElementById(src || lowerCasePage);
      smoothScrollTo(targetElement);
    };

    const linkElement = document.getElementById(`${src || lowerCasePage}-link`);
    if (linkElement) {
      linkElement.addEventListener("click", handleSmoothScroll);
    }

    return () => {
      if (linkElement) {
        linkElement.removeEventListener("click", handleSmoothScroll);
      }
    };
  }, [src, lowerCasePage, setSelectedPage]);

  return (
    <a
      id={`${src || lowerCasePage}-link`}
      className={`flex flex-row items-center xl:text-xl ${
        selectedPage === (src || lowerCasePage) ? "text-white " : "text-white "
      }
      transition duration-500 px-[.5px] ${className}`} // Apply className here
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
