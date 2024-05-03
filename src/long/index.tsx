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
  const [time, setTime] = useState<number>(timerValue3 * 60);
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
    setTime(timerValue3 * 60);

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
    setTime(timerValue3 * 60);
    setProgress(0);
  }, [timerValue3]);

  useEffect(() => {
    const percentage = ((timerValue3 * 60 - time) / (timerValue3 * 60)) * 100;
    const formattedPercentage = Math.max(percentage, 0).toFixed(1);

    setProgress(parseFloat(formattedPercentage));
  }, [timerValue3, time]);

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
    setTime(timerValue3 * 60);
  };

  return (
    <div className=" w-full  flex items-center justify-center flex-col">
      <div className="flex flex-row  m-2 items-center gap-4">
        <ControlButton
          text={
            <img
              src={resetSvg}
              alt="Reset"
              className="w-10 sm:w-10 md:w-12 lg:w-14"
            />
          }
          onClick={resetTimer}
        />
        {/* <div className="w-28 z-1 h-28 bg-white rounded-full text-blue-500 font-semibold flex items-center justify-center"> */}
        <div
          className=" z-1 h-32 w-32 md:h-40 md:w-40 lg:h-48 xl:h-56 2xl:h-64  bg-white rounded-full text-blue-500 font-semibold
           text-lg flex items-center justify-center relative lg:w-48 xl:w-56 2xl:w-64">
          <div className="flex flex-row m-2 absolute items-center  gap-4">
            <audio ref={tickingRef} preload="auto" src={selectedTicking} />
            <span className="block w-[3.4rem] text-left p-1 m-1 ">
              {formatTime(time)}
            </span>

            <audio ref={audioRef} preload="auto" src={selectedAlarm} />
          </div>
        </div>
        <ControlButton
          text={
            <img
              src={nextSvg}
              alt="Next"
              className="w-10 sm:w-10 md:w-12 lg:w-14"
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
              className="w-10 sm:w-10 md:w-12 lg:w-14"
            />
          ) : (
            <img
              src={playSvg}
              alt="Play"
              className="w-10 sm:w-10 md:w-12 lg:w-14"
            />
          )
        }
        onClick={() => toggleTimer()}
      />
      <div className="w-[70%] md:w-[50%] mx-auto mt-8 pt-4">
        <ProgressBar value={progress} />
      </div>
    </div>
  );
};

export default LongBreak;
