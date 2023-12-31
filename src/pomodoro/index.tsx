// pomodoro/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { SelectedPage } from "@/shared/types";
import { ControlButton } from "../components/ButtonComponents";
import { useSoundContext } from "@/components/SoundContext";
import { useTimerContext } from "@/components/TimerContext";
import playSvg from "@/assets/play.svg";
import pauseSvg from "@/assets/pause.svg";
import resetSvg from "@/assets/reset.svg";
import nextSvg from "@/assets/next.svg";
import ProgressBar from "@/components/ProgressBar";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Index: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue1, formatTime } = useTimerContext();
  const [time, setTime] = useState(timerValue1 * 60);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0); // Initial value set to 0
  const { selectedAlarm } = useSoundContext();

  useEffect(() => {
    setTime(timerValue1 * 60);
    setProgress(0);
  }, [timerValue1]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setProgress((_prevProgress) =>
          Math.floor(((timerValue1 * 60 - time) / (timerValue1 * 60)) * 100)
        );
      }, 1000);
    } else if (time === 0) {
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage, timerValue1]);

  const handleTimerCompletion = () => {
    setIsActive(false);
    setTime(timerValue1 * 60);
    setProgress(100);
    const audio = audioRef.current;
    if (audio) {
      var audioPlay = audio.play();
      audioPlay
        .then(() => {
          setTimeout(() => {
            console.log("hi");
          }, 2000);
        })
        .catch((error: any) => {
          console.error(error);
        });
      const audioDuration = 10000;
      setTimeout(() => {
        setSelectedPage(SelectedPage.ShortBreak);
      }, audioDuration);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="flex flex-row m-2 items-center gap-4">
          <ControlButton
            text={<img src={resetSvg} alt="Reset" />}
            onClick={() => {
              setIsActive(false);
              setTime(timerValue1 * 60);
            }}
          />

          <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
            <div className="flex flex-row m-2 items-center gap-4">
              {formatTime(time)}
              <audio ref={audioRef} preload="none" src={selectedAlarm}></audio>
            </div>
          </div>
          <ControlButton
            text={<img src={nextSvg} alt="Next" />}
            onClick={() => setSelectedPage(SelectedPage.ShortBreak)}
          />
        </div>

        <ControlButton
          text={
            isActive ? (
              <img src={pauseSvg} alt="Pause" />
            ) : (
              <img src={playSvg} alt="Play" />
            )
          }
          onClick={() => toggleTimer()}
        />
        <div className="container mx-auto mt-8">
          <ProgressBar value={progress} />
        </div>
      </div>
    </>
  );
};

export default Index;
