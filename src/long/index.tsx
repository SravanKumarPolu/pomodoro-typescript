// tsrafce
import { useEffect, useState, useRef } from "react";
import { SelectedPage } from "@/shared/types";
import { ControlButton } from "@/components/ButtonComponents";
import skr from "@/assets/long-to-pomodoro.mp3";
import { useTimerContext } from "@/components/TimerContext";
import { useSoundContext } from "@/components/SoundContext";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const LongBreak = ({ setSelectedPage }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue3 } = useTimerContext();
  const [time, setTime] = useState(timerValue3 * 60);
  const { selectedAlarm } = useSoundContext();
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setTime(timerValue3 * 60);
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
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-row m-2 items-center gap-4">
        <ControlButton
          text="Reset"
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
          text="Next"
          onClick={() => setSelectedPage(SelectedPage.Pomodoro)}
        />
      </div>

      <ControlButton
        text={isActive ? "Pause" : "Play"}
        onClick={() => toggleTimer()}
      />
    </div>
  );
};

export default LongBreak;
