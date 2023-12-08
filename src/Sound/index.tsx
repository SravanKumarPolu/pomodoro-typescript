// Sound.tsx
import React, { useEffect, useState } from "react";

import { useSoundContext } from "@/components/SoundContext";

type Props = {};

const Sound: React.FC<Props> = () => {
  const [, setDurationTickling] = useState(0);
  const [tickingVolume, setTicklingVolume] = useState(0.5);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const {
    selectedAlarm,
    setSelectedAlarm,
    selectedTicking,
    setSelectedTicking,
    tickingOptions,
    alarmOptions,
  } = useSoundContext();

  const handleAlarmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlarm(event.target.value);
  };

  const handleTicklingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTicking = event.target.value;
    setSelectedTicking(selectedTicking === "None" ? "" : selectedTicking);

    if (audio && !audio.paused) {
      audio.pause();
      audio.src = selectedTicking;
      audio.play();
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTicklingVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(event.target.value);
    if (audio) {
      audio.volume = newVolume;
      setTicklingVolume(newVolume);
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
    if (audio && selectedAlarm) {
      audio?.pause();
      audio.src = selectedAlarm;
      audio.play();
    }
  }, [selectedAlarm, audio]);

  useEffect(() => {
    if (audio && selectedTicking) {
      audio.pause();
      audio.src = selectedTicking;
      audio.play();
    } else {
      audio?.pause();
    }
  }, [selectedTicking, audio]);
  return (
    <div className="flex flex-col w-[20rem] p-2 ">
      <div className="flex flex-row justify-between pt-2">
        <span>Alarm Sound</span>
        <div className="flex flex-col">
          <select
            className="bg-gray-200 p-1 rounded-sm"
            value={selectedAlarm}
            onChange={handleAlarmChange}>
            {alarmOptions.map((option) => (
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
      <div className="flex flex-row justify-between py-2">
        <span>Ticking Sound</span>
        <div className="flex flex-col  ">
          <select
            className="bg-gray-200 p-1 rounded-sm"
            value={selectedTicking || "None"}
            onChange={handleTicklingChange}>
            {tickingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pt-4">
            <input
              type="range"
              value={tickingVolume}
              max={1}
              step={0.01}
              onChange={handleTicklingVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sound;
