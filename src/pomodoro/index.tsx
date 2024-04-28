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
import LiveTime from "@/components/LiveTime";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Index: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const { timerValue1, formatTime } = useTimerContext();
  const [time, setTime] = useState<number>(timerValue1 * 60);
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
    setTime(timerValue1 * 60);

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
    setTime(timerValue1 * 60);
    setProgress(0);
  }, [timerValue1]);

  useEffect(() => {
    const percentage = ((timerValue1 * 60 - time) / (timerValue1 * 60)) * 100;
    const formattedPercentage = Math.max(percentage, 0).toFixed(1);

    setProgress(parseFloat(formattedPercentage));
  }, [timerValue1, time]);

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
    setTime(timerValue1 * 60);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="flex flex-row m-2 items-center gap-4">
          <ControlButton
            text={<img src={resetSvg} alt="Reset" />}
            onClick={resetTimer}
          />

          <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center relative">
            <div className="flex flex-row m-2 items-center justify-center gap-4">
              <audio ref={tickingRef} preload="auto" src={selectedTicking} />
              <span className="block w-[3.4rem] text-left p-1 m-1">
                {formatTime(time)}
              </span>
              <LiveTime />
              <audio ref={audioRef} preload="auto" src={selectedAlarm}></audio>
            </div>
          </div>

          <ControlButton
            text={<img src={nextSvg} alt="Next" />}
            onClick={() => {
              setSelectedPage(SelectedPage.ShortBreak);
            }}
          />
        </div>

        <ControlButton
          text={
            isActive ? (
              <>
                <img src={pauseSvg} alt="Pause" />
              </>
            ) : (
              <>
                <img src={playSvg} alt="Play" />
              </>
            )
          }
          onClick={toggleTimer}
        />
        <div className="container mx-auto mt-8">
          <ProgressBar value={progress} />
        </div>
      </div>
    </>
  );
};

export default Index;
