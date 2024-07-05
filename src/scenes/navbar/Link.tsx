import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useEffect, useState } from "react";

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
      onClick={handleClick}
      offset={() => {
        // Handle missing elements gracefully
        const element = document.querySelector(`#${src || lowerCasePage}`);
        return element ? element.getBoundingClientRect().top : 0;
      }}>
      {src ? (
        <img
          src={src}
          className={className}
          alt=""
          width={width}
          height={height}
        />
      ) : (
        <span>{page}</span> // Use <span> instead of <div> to ensure inline content
      )}
    </AnchorLink>
  );
};

export default Link;
