import { SelectedPage } from "@/shared/types";
import Link from "../navbar/Link";
import useMediaQuery from "@/hooks/useMediaQuery";
import Pomodoro from "@/pomodoro";
import ShortBreak from "@/short";
import LongBreak from "@/long";

import { useEffect, useState } from "react";
import TodoWrapper from "@/todolist/TodoWrapper";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero: React.FC<Props> = ({ selectedPage, setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px");

  const [remainingTime, setRemainingTime] = useState<number>(25 * 60);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          // handleTimeout();
          clearInterval(timer);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedPage, setSelectedPage, remainingTime]);

  const renderPage = () => {
    switch (selectedPage) {
      case SelectedPage.Pomodoro:
        return (
          <Pomodoro
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      case SelectedPage.ShortBreak:
        return (
          <ShortBreak
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      case SelectedPage.LongBreak:
        return (
          <LongBreak
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
      default:
        return (
          <Pomodoro
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        );
    }
  };

  return (
    <div className=" flex items-center  justify-center p-2 ">
      <div
        className={`flex h-[3orem] mt-0  flex-col items-center justify-center pt-2 p-10 
       ${isAboveMediumScreens ? "w-5/6" : "w-full"}
       bg-primary-300 rounded text-white absolute`}>
        <div className="flex flex-col gap-2 items-center justify-around">
          <div className="flex flex-row m-2">
            <button
              className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs"
              onClick={() => setSelectedPage(SelectedPage.Pomodoro)}>
              <Link
                page="Pomodoro"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="m-2 px-2 border-2  rounded xs:mx-1 xs:text-xs"
              onClick={() => setSelectedPage(SelectedPage.ShortBreak)}>
              <Link
                page="ShortBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
            <button
              className="m-2 px-2 border-2 rounded xs:mx-1 xs:text-xs"
              onClick={() => setSelectedPage(SelectedPage.LongBreak)}>
              <Link
                page="LongBreak"
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </button>
          </div>
          {renderPage()}
        </div>
        <div className="flex flex-wrapper bg-white   p-6 rounded-lg h-[19rem] shadow-lg">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
};

export default Hero;
