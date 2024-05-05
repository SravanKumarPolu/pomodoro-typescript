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
  const [time, setTime] = useState<number>(timerValue2 * 60);
  const audioRef = useRef<HTMLAudioElement>(null);
  const tickingRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    selectedAlarm,
    selectedTicking,
    setTicking,
    audioVolume1,
    audioVolume2,
  } = useSoundContext();

  const handleTimerCompletion = () => {
    setIsActive(false);
    setTime(timerValue2 * 60);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = audioVolume1;
      audio
        .play()
        .then(() => {
          setTimeout(() => {
            console.log("hi");
            setSelectedPage(SelectedPage.ShortBreak);
          }, 10000); // Adjust the duration as needed
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    setTime(timerValue2 * 60);
    setProgress(0);
  }, [timerValue2]);

  useEffect(() => {
    const percentage = ((timerValue2 * 60 - time) / (timerValue2 * 60)) * 100;
    const formattedPercentage = Math.max(percentage, 0).toFixed(1);

    setProgress(parseFloat(formattedPercentage));
  }, [timerValue2, time]);

  useEffect(() => {
    setTicking(selectedTicking);
  }, [selectedTicking, setTicking]);

  useEffect(() => {
    const tickingAudio = tickingRef.current;

    if (isActive && tickingAudio) {
      tickingAudio.play();
      tickingAudio.volume = audioVolume2;
      tickingAudio.loop = true;
    } else if (!isActive && tickingAudio) {
      tickingAudio.pause();
      tickingAudio.currentTime = 0;
    }
  }, [isActive, audioVolume2]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current!);
          handleTimerCompletion();
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const toggleTimer = () => {
    setIsActive((prevActive) => {
      if (!prevActive) {
        startTimer();
      } else {
        stopTimer();
      }
      return !prevActive;
    });
  };

  const resetTimer = () => {
    stopTimer();
    setIsActive(false);
    setTime(timerValue2 * 60);
  };

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

  return (
    <div className="w-full  flex items-center justify-center flex-col">
      <section className="flex flex-row m-2 items-center gap-4">
        <ControlButton
          text={<img src={resetSvg} alt="Reset" className="w-8" />}
          onClick={resetTimer}
        />

        <div
          className=" z-1 h-32 w-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44   bg-white rounded-full text-blue-500 font-semibold
           text-lg flex items-center justify-center relative ">
          <div className="flex flex-row m-2 absolute items-center  justify-center gap-4">
            <audio ref={tickingRef} preload="auto" src={selectedTicking} />
            <span className="block w-[3.4rem] text-left p-1 m-1  ">
              {formatTime(time)}
            </span>

            <audio ref={audioRef} preload="auto" src={selectedAlarm} />
          </div>
        </div>
        <ControlButton
          text={<img src={nextSvg} alt="Next" className="w-8" />}
          onClick={() => setSelectedPage(SelectedPage.Pomodoro)}
        />
      </section>
      <section>
        <ControlButton
          text={
            isActive ? (
              <img src={pauseSvg} alt="Pause" className="w-8" />
            ) : (
              <img src={playSvg} alt="Play" className="w-8" />
            )
          }
          onClick={() => toggleTimer()}
        />
      </section>

      <section className="w-[70%] md:w-[50%] mx-auto mt-8 pt-4">
        <ProgressBar value={progress} />
      </section>
    </div>
  );
};

export default ShortBreak;
