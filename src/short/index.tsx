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

  const [, setEndTime] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(timerValue2 * 60);
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
    setEndTime(null);
    setRemainingTime(timerValue2 * 60);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = audioVolume1;

      const playAudio = () => {
        audio.currentTime = 0;
        audio.play().catch((error) => console.error(error));
      };

      playAudio();

      const intervalId = setInterval(playAudio, audio.duration * 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        audio.pause();
        audio.currentTime = 0;
        setSelectedPage(SelectedPage.Pomodoro);
      }, 7000);
    }
  };

  useEffect(() => {
    setRemainingTime(timerValue2 * 60);
    setProgress(0);
  }, [timerValue2]);

  useEffect(() => {
    const percentage =
      ((timerValue2 * 60 - remainingTime) / (timerValue2 * 60)) * 100;
    const formattedPercentage = Math.max(percentage, 0).toFixed(1);
    setProgress(parseFloat(formattedPercentage));
  }, [timerValue2, remainingTime]);

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
    const end = new Date();
    end.setMinutes(end.getMinutes() + timerValue2);
    setEndTime(end);

    intervalRef.current = setInterval(() => {
      const now = new Date();
      const distance = end.getTime() - now.getTime();

      if (distance <= 0) {
        clearInterval(intervalRef.current!);
        handleTimerCompletion();
      } else {
        setRemainingTime(Math.ceil(distance / 1000));
      }
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
    setEndTime(null);
    setRemainingTime(timerValue2 * 60);
  };

  return (
    <div className="w-full flex items-center justify-center flex-col ">
      <section className="flex flex-row items-center  m-2">
        <ControlButton
          text={
            <img src={resetSvg} alt="Reset" className="w-8 md:w-10 xl:w-12" />
          }
          onClick={resetTimer}
        />

        <div className="z-1 h-32 w-32 md:w-40 md:h-40 xl:w-48 xl:h-48 bg-white rounded-full text-blue-500 font-semibold text-lg md:text-xl xl:text-2xl flex items-center justify-center relative">
          <div className="flex flex-row items-center justify-center absolute gap-4 md:gap-6 xl:gap-8 m-2">
            <audio ref={tickingRef} preload="auto" src={selectedTicking} />
            <span className="block w-[3.4rem] md:w-[4rem] xl:w-[5rem] text-left p-1 m-1">
              {formatTime(remainingTime)}
            </span>
            <audio ref={audioRef} preload="auto" src={selectedAlarm} />
          </div>
        </div>

        <ControlButton
          text={
            <img src={nextSvg} alt="Next" className="w-8 md:w-10 xl:w-12" />
          }
          onClick={() => setSelectedPage(SelectedPage.Pomodoro)}
        />
      </section>

      <section className="mt-4 md:mt-6 xl:mt-8">
        <ControlButton
          text={
            isActive ? (
              <img src={pauseSvg} alt="Pause" className="w-8 md:w-10 xl:w-12" />
            ) : (
              <img src={playSvg} alt="Play" className="w-8 md:w-10 xl:w-12" />
            )
          }
          onClick={() => toggleTimer()}
        />
      </section>

      <section className="w-[70%] md:w-[50%] lg:w-[50%] 2xl:w-[60%] mx-auto mt-8 md:mt-10 xl:mt-12 pt-4">
        <ProgressBar value={progress} />
      </section>
    </div>
  );
};

export default ShortBreak;
