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

  const { selectedAlarm, selectedTicking, setTicking } = useSoundContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTime(timerValue3 * 60);
    setProgress(0);
  }, [timerValue3]);

  useEffect(() => {
    setTicking(selectedTicking);
  }, [selectedTicking, setTicking]);

  useEffect(() => {
    const tickingAudio = tickingRef.current;
    if (isActive && tickingAudio) {
      tickingAudio.play();
      tickingAudio.loop = true;
    } else if (!isActive && tickingAudio) {
      tickingAudio.pause();
      tickingAudio.currentTime = 0;
    }
  }, [isActive]);
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
      var audioPlay = audio.play();
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
          <audio ref={tickingRef} preload="auto" src={selectedTicking} />
          {formatTime(time)}

          <audio ref={audioRef} preload="auto" src={selectedAlarm} />
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
