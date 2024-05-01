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
    <div className="h-96 md:h-80 lg:h-72 xl:h-64 2xl:h-56 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 flex items-center justify-center flex-col">
      <div className="flex flex-col md:flex-row m-2 md:items-center md:gap-4">
        <ControlButton
          text={
            <img
              src={resetSvg}
              alt="Reset"
              className="w-full sm:w-10 md:w-12 lg:w-14"
            />
          }
          onClick={resetTimer}
        />

        <div className="z-1 h-full w-full md:h-40 md:w-40 lg:h-48 xl:h-56 2xl:h-64 mt-10 bg-white rounded-full text-blue-500 font-semibold text-lg flex items-center justify-center relative lg:w-48 xl:w-56 2xl:w-64">
          <div className="flex flex-row m-2 items-center justify-center gap-4">
            <audio
              ref={tickingRef}
              preload="auto"
              src={selectedTicking}
              className="hidden md:block"
            />
            <span className="block md:w-20 lg:w-24 xl:w-32 2xl:w-40 text-left p-1 m-1">
              {formatTime(time)}
            </span>
            <audio
              ref={audioRef}
              preload="auto"
              src={selectedAlarm}
              className="hidden md:block"
            />
          </div>
        </div>

        <ControlButton
          text={
            <img
              src={nextSvg}
              alt="Next"
              className="w-full sm:w-10 md:w-12 lg:w-14"
            />
          }
          onClick={() => setSelectedPage(SelectedPage.Pomodoro)}
        />
      </div>

      <ControlButton
        text={
          isActive ? (
            <img
              src={pauseSvg}
              alt="Pause"
              className="w-full sm:w-10 md:w-12 lg:w-14"
            />
          ) : (
            <img
              src={playSvg}
              alt="Play"
              className="w-full sm:w-10 md:w-12 lg:w-14"
            />
          )
        }
        onClick={() => toggleTimer()}
      />

      <div className="container mx-auto mt-8 pt-4">
        <ProgressBar value={progress} />
      </div>
    </div>
  );
};

export default ShortBreak;
