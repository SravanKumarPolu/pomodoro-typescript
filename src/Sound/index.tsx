// Sound.tsx
import React, { useEffect, useState } from "react";
import SoundSvg from "@/assets/sound.svg";
import { useSoundContext } from "@/components/SoundContext";

type Props = {};

const Sound: React.FC<Props> = () => {
  const [, setDurationTickling] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const {
    selectedAlarm,
    selectedSound,
    setSelectedAlarm,

    soundOptions,
  } = useSoundContext();

  const handleAlarmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlarm(event.target.value);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("loadeddata", () =>
        setDurationTickling(audio.duration)
      );

      return () => {
        audio.removeEventListener("loadeddata", () =>
          setDurationTickling(audio.duration)
        );
      };
    }
  }, [audio]);

  useEffect(() => {
    const newAudio = new Audio();
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
        newAudio.src = "";
        newAudio.load();
      }
    };
  }, []);

  useEffect(() => {
    if (audio && selectedSound) {
      audio.pause();
      audio.src = selectedSound;
      audio.play();
    } else {
      audio?.pause();
    }
  }, [selectedSound, audio]);

  useEffect(() => {
    if (audio && selectedAlarm) {
      audio.pause();
      audio.src = selectedAlarm;
      audio.play();
    }
  }, [selectedAlarm, audio]);

  return (
    <div className="flex flex-col w-[20rem] p-2 border-b-2 border-white-500">
      <div className="flex flex-row p-1">
        <img src={SoundSvg} width={20} height={20} />
        <h2 className="ml-1">Sound</h2>
      </div>
      <div className="flex flex-row justify-between">
        <span>Alarm Sound</span>
        <div className="flex flex-col">
          <select
            className="bg-gray-200 p-1 rounded-sm"
            value={selectedAlarm}
            onChange={handleAlarmChange}>
            {soundOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="pt-4">
            <input
              type="range"
              value={volume}
              max={1}
              step={0.01}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sound;
