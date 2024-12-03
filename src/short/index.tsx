import React, { useEffect, useRef, useState } from "react";

import { ControlButton } from "@/components/ButtonComponents";
import ProgressBar from "@/components/ProgressBar";
import { SelectedPage } from "@/shared/types";
import nextSvg from "@/assets/next.svg";
import pauseSvg from "@/assets/pause.svg";
import playSvg from "@/assets/play.svg";
import resetSvg from "@/assets/reset.svg";
import { useSoundContext } from "@/components/SoundContext";
import { useTimerContext } from "@/components/TimerContext";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  selectedTimer: SelectedPage | null;
  setSelectedTimer: (value: SelectedPage | null) => void;
};

const ShortBreak: React.FC<Props> = ({
  setSelectedPage,
  setSelectedTimer,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue2, formatTime } = useTimerContext();
  const [remainingTime, setRemainingTime] = useState<number>(timerValue2 * 60);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const tickingRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { selectedAlarm, selectedTicking, audioVolume1, audioVolume2 } =
    useSoundContext();

  const handleTimerCompletion = () => {
    setIsActive(false);
    setRemainingTime(timerValue2 * 60);

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = audioVolume1;
      audio.currentTime = 0;

      const playAlarm = () => {
        audio.play().catch(console.error);
      };

      playAlarm();
      const alarmInterval = setInterval(playAlarm, audio.duration * 1000);

      setTimeout(() => {
        clearInterval(alarmInterval);
        audio.pause();
        setSelectedPage(SelectedPage.Pomodoro);
        setSelectedTimer(SelectedPage.Pomodoro);
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
    setProgress(parseFloat(percentage.toFixed(1)));
  }, [remainingTime, timerValue2]);

  useEffect(() => {
    const tickingAudio = tickingRef.current;
    if (isActive && tickingAudio) {
      tickingAudio.volume = audioVolume2;
      tickingAudio.loop = true;
      tickingAudio.play().catch(console.error);
    } else if (tickingAudio) {
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
    const endTime = Date.now() + remainingTime * 1000;
    intervalRef.current = setInterval(() => {
      const timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setRemainingTime(timeLeft);

      if (timeLeft === 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        handleTimerCompletion();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleTimer = () => {
    setIsActive((prev) => {
      if (prev) {
        stopTimer();
      } else {
        startTimer();
      }
      return !prev;
    });
  };

  const resetTimer = () => {
    stopTimer();
    setIsActive(false);
    setRemainingTime(timerValue2 * 60);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 mt-10 gap-5">
      {/* Timer Controls */}
      <section className="flex gap-4 my-4">
        <ControlButton
          icon={<img src={resetSvg} alt="Reset" />}
          onClick={resetTimer}
        />
        <div className="relative flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-full bg-white text-blue-600">
          <audio ref={audioRef} src={selectedAlarm} preload="auto" />
          <audio ref={tickingRef} src={selectedTicking} preload="auto" />
          <span className="text-xl">{formatTime(remainingTime)}</span>
        </div>
        <ControlButton
          icon={<img src={nextSvg} alt="Next" />}
          onClick={() => {
            setSelectedPage(SelectedPage.Pomodoro);
            setSelectedTimer(SelectedPage.Pomodoro);
          }}
        />
      </section>

      {/* Play/Pause */}
      <ControlButton
        icon={
          <img
            src={isActive ? pauseSvg : playSvg}
            alt={isActive ? "Pause" : "Play"}
          />
        }
        onClick={toggleTimer}
        className="mt-6"
      />

      {/* Progress Bar */}
      <ProgressBar value={progress} />
    </div>
  );
};

export default ShortBreak;
