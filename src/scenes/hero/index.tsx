import React from "react";
import { SelectedPage } from "@/shared/types";
import Link from "../navbar/Link";
import reset from "@/assets/reset.svg";
import next from "@/assets/next.svg";
import useMediaQuery from "@/hooks/useMediaQuery";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero = ({ selectedPage, setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <div className="h-screen flex items-center justify-center p-2">
      <div
        className={`flex items-center justify-center h-${
          isAboveMediumScreens ? "3/6" : "4/6"
        } w-${
          isAboveMediumScreens ? "3/6" : "full"
        }  bg-gray-950 rounded text-gray-100 relative  `}>
        <div className="w-full h-full flex flex-col items-center justify-around">
          <div className="flex flex-row m-2">
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="Pomodoro"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="ShortBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="LongBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>
          {isAboveMediumScreens ? (
            <div className="flex flex-row m-2 items-center gap-4">
              <button className="m-2 px-2 border-2 rounded ">
                <Link
                  page="reset"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>
              <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-400 flex items-center justify-center">
                25:00
              </div>
              <button className="m-2 px-2 border-2 rounded ">
                <Link
                  page="Next"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center gap-1">
              <button className="flex bg-white m-2  border-2 rounded w-12 h-12 items-center  justify-center">
                <img className="  " src={reset} alt="" width={24} height={24} />
              </button>
              <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-400 flex items-center justify-center">
                25:00
              </div>
              <button className="flex bg-white m-2  border-2 rounded w-12 h-12 items-center  justify-center">
                <img className="  " src={next} alt="" width={24} height={24} />
              </button>
            </div>
          )}
          <div className="flex flex-row m-2">
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="Start"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs">
              <Link
                page="Stop"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
