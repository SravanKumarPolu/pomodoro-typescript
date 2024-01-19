import React, { useEffect, useState } from "react";
import { useSoundContext } from "@/components/SoundContext";

type Props = {};

const Sound: React.FC<Props> = () => {
  const [, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [tickingVolume, setTickingVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const {
    selectedAlarm,
    setSelectedAlarm,
    selectedTicking,
    setSelectedTicking,
    tickingOptions,
    alarmOptions,
  } = useSoundContext();

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

  const setupAudioEventListeners = () => {
    if (!audio) return;

    const loadedDataHandler = () => setDuration(audio.duration);

    audio.addEventListener("loadeddata", loadedDataHandler);

    return () => {
      audio.removeEventListener("loadeddata", loadedDataHandler);
    };
  };

  useEffect(setupAudioEventListeners, [audio]);

  const handleSoundChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setSound: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const selectedSound = event.target.value;
    setSound(selectedSound === "None" ? "" : selectedSound);

    if (audio && selectedSound) {
      audio.pause();
      audio.src = selectedSound;
      audio.play();
    }
  };

  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setVolume: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const newVolume = parseFloat(event.target.value);
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div className="flex flex-col w-auto p-2 ">
      <div className="flex flex-row justify-between pt-2">
        <span>Alarm Sound</span>
        <div className="flex flex-col">
          <select
            className="bg-gray-200 p-1 rounded-sm"
            value={selectedAlarm}
            onChange={(e) => handleSoundChange(e, setSelectedAlarm)}>
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
              onChange={(e) => handleVolumeChange(e, setVolume)}
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
            onChange={(e) => handleSoundChange(e, setSelectedTicking)}>
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
              onChange={(e) => handleVolumeChange(e, setTickingVolume)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sound;
