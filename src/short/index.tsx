import React, { useEffect, useState, useRef } from "react";
import { SelectedPage } from "@/shared/types";
import playSvg from "@/assets/play.svg";
import pauseSvg from "@/assets/pause.svg";
import { useTimerContext } from "@/components/TimerContext";
import { ControlButton } from "@/components/ButtonComponents";
import { useSoundContext } from "@/components/SoundContext";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const ShortBreak: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue2, formatTime } = useTimerContext();
  const { selectedAlarm } = useSoundContext();
  const [time, setTime] = useState(timerValue2);

  useEffect(() => {
    setTime(timerValue2 * 60);
  }, [timerValue2]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      setTime(timerValue2 * 60);
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
            setTime(timerValue2 * 60);
            setIsActive(false);
          }}
        />

        <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center">
          {formatTime(time)}
          <audio ref={audioRef} preload="auto" src={selectedAlarm} />
        </div>

        <ControlButton
          text="Next"
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
    </div>
  );
};

export default ShortBreak;
