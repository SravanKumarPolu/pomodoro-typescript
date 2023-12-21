// tsrafce
import { useEffect, useState, useRef } from "react";
import { SelectedPage } from "@/shared/types";
import { ControlButton } from "@/components/ButtonComponents";
import playSvg from "@/assets/play.svg";
import pauseSvg from "@/assets/pause.svg";
import { useTimerContext } from "@/components/TimerContext";
import { useSoundContext } from "@/components/SoundContext";
import resetSvg from "@/assets/reset.svg";
import nextSvg from "@/assets/next.svg";
import ProgressBar from "@/components/ProgressBar";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const LongBreak = ({ setSelectedPage }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue3, formatTime } = useTimerContext();
  const [time, setTime] = useState(timerValue3 * 60);
  const { selectedAlarm } = useSoundContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTime(timerValue3 * 60);
    setProgress(0);
  }, [timerValue3]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setProgress((_prevProgress: any) =>
          Math.floor(((timerValue3 * 60 - time) / (timerValue3 * 60)) * 100)
        );
      }, 1000);
    } else if (time === 0) {
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage, timerValue3]);

  const handleTimerCompletion = () => {
    setIsActive(false);
    setTime(timerValue3 * 60);
    setProgress(100);
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch((error: any) => {
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
            toggleTimer();
            setTime(timerValue3 * 60);
            setIsActive(false);
          }}
        />
        <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
          {formatTime(time)}
          <audio ref={audioRef} preload="none" src={selectedAlarm}></audio>
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
      <div className="container mx-auto mt-8">
        <ProgressBar value={progress} />
      </div>
    </div>
  );
};

export default LongBreak;
