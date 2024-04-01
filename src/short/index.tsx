import React, { useEffect, useState, useRef } from "react";
import { SelectedPage } from "@/shared/types";
import playSvg from "@/assets/play.svg";
import pauseSvg from "@/assets/pause.svg";
import { useTimerContext } from "@/components/TimerContext";
import { ControlButton } from "@/components/ButtonComponents";
import { useSoundContext } from "@/components/SoundContext";
import resetSvg from "@/assets/reset.svg";
import nextSvg from "@/assets/next.svg";
import ProgressBar from "@/components/ProgressBar";
type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const ShortBreak: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue2, formatTime } = useTimerContext();
  const { selectedAlarm, selectedTicking, setTicking } = useSoundContext();
  const [time, setTime] = useState(timerValue2);
  const tickingRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTime(timerValue2 * 60);
    setProgress(0);
  }, [timerValue2]);

  useEffect(() => {
    setTicking(selectedTicking);
  }, [selectedTicking, setTicking]);
  useEffect(() => {
    const tickingAudio = tickingRef.current;
    if (isActive && tickingAudio) {
      tickingAudio.play();
      tickingAudio.loop = true;
    } else if (!isActive && tickingAudio) {
      tickingAudio.pause();
      tickingAudio.currentTime = 0;
    }
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    const tickingAudio = tickingRef.current;
    if (tickingAudio) {
      if (!isActive) {
        tickingAudio.play();
        tickingAudio.loop = true;
      } else {
        tickingAudio.pause();
        tickingAudio.currentTime = 0;
      }
    }
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          Math.floor(((timerValue2 * 60 - newTime) / (timerValue2 * 60)) * 100);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage, timerValue2]);

  const handleTimerCompletion = () => {
    setIsActive(false);
    setTime(timerValue2 * 60);
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
        setSelectedPage(SelectedPage.Pomodoro);
      }, audioDuration);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-row m-2 items-center gap-4">
        <ControlButton
          text={<img src={resetSvg} alt="Reset" />}
          onClick={() => {
            setTime(timerValue2 * 60);
            setIsActive(false);
          }}
        />

        <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
          <div className="flex flex-row m-2 absolute items-center  justify-center gap-4">
            <audio ref={tickingRef} preload="auto" src={selectedTicking} />
            <span className="block w-[3.4rem] text-left p-1 m-1  ">
              {formatTime(time)}
            </span>

            <audio ref={audioRef} preload="auto" src={selectedAlarm} />
          </div>
          <div className="container relative items-center justify-center ml-[1rem] mr-[5.6rem]  mt-[.1rem]  ">
            <ProgressBar value={progress} radius={70} />
          </div>
        </div>
        <ControlButton
          text={<img src={nextSvg} alt="Next" />}
          onClick={() => setSelectedPage(SelectedPage.Pomodoro)}
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
      {/* <div className="container mx-auto mt-8">
        <ProgressBar value={progress} />
      </div> */}
    </div>
  );
};

export default ShortBreak;
