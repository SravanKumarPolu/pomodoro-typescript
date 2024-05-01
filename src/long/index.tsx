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
  const tickingRef = useRef<HTMLAudioElement>(null);

  const {
    selectedAlarm,
    selectedTicking,
    setTicking,
    audioVolume1,
    audioVolume2,
  } = useSoundContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTime(timerValue3 * 60);
    setProgress(0);
  }, [timerValue3]);
  useEffect(() => {
    const percentage = ((timerValue3 * 60 - time) / (timerValue3 * 60)) * 100;

    const formattedPercentage = Math.max(percentage, 0).toFixed(1);

    setProgress(parseFloat(formattedPercentage));
  }, [time, timerValue3]);

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
          Math.floor(((timerValue3 * 60 - newTime) / (timerValue3 * 60)) * 100);
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      handleTimerCompletion();
    }

    return () => clearInterval(interval);
  }, [isActive, time, setSelectedPage, timerValue3]);

  const handleTimerCompletion = () => {
    setIsActive(false);
    setTime(timerValue3 * 60);

    const audio = audioRef.current;
    if (audio) {
      var audioPlay = audio.play();
      audio.volume = audioVolume1;
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
    <div className="h-96 md:h-80 lg:h-72 xl:h-64 2xl:h-56 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 flex items-center justify-center flex-col">
      <div className="flex flex-row m-2 items-center gap-4">
        <ControlButton
          text={
            <img
              src={resetSvg}
              alt="Reset"
              className="w-full sm:w-10 md:w-12 lg:w-14"
            />
          }
          onClick={() => {
            toggleTimer();
            setTime(timerValue3 * 60);
            setIsActive(false);
          }}
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

export default LongBreak;
