import { SelectedPage } from "@/shared/types";
import React from "react";
import Link from "../navbar/Link";

type Props = {
  selectedPage: SelectedPage;

  setSelectedPage: (value: SelectedPage) => void;
};

const Hero = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <>
      <div className=" h-screen flex items-center justify-center p-2">
        <div className=" w-3/6 flex items-center justify-center h-4/6  bg-gray-950 rounded text-gray-100 relative ">
          <div className="absolute w-full h-full flex flex-col items-center justify-around ">
            <div className="flex flex-row m-2 ">
              <button className=" m-2 px-2 border-2 rounded">
                <Link
                  page="Pomodoro"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>
              <button className="m-2 px-2 border-2 rounded">
                <Link
                  page="ShortBreak"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>
              <button className="m-2 px-2 border-2 rounded">
                <Link
                  page="LongBreak"
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </button>
            </div>
            <div className="w-40 z-1 h-40 bg-white rounded-full text-blue-400 flex items-center justify-center">
              {" "}
              25:00
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
