import Bell from "@/assets/pomo-to-short.mp3";
import Kitchen from "@/assets/long-to-pomodoro.mp3";
import Bird from "@/assets/bird.mp3";
import Wood from "@/assets/wood.mp3";

import Digital from "@/assets/digital.mp3";
import SoundSvg from "@/assets/sound.svg";
import { useEffect, useState } from "react";
import { useSoundContext } from "@/components/SoundContext";

type Props = {};

const Sound: React.FC<Props> = ({}: Props) => {
  const [, setDurationTickling] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { setAlarm } = useSoundContext();
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");

  const handleAlarmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedAlarm = event.target.value;
    setSelectedAlarm(newSelectedAlarm);
    setAlarm(newSelectedAlarm);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  };
  useEffect(() => {
    if (audio && selectedAlarm) {
      audio.pause();
      audio.src = selectedAlarm;
      audio.load();
    }
  }, [selectedAlarm, audio]);
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
      audio.pause();
      audio.src = selectedAlarm;
      audio.load();
    }
  }, [selectedAlarm, audio]);
  return (
    <div className=" flex flex-col  w-[20rem]  p-2 border-b-2 border-white-500">
      <div className="flex flex-row p-1">
        <img src={SoundSvg} width={20} height={20} />
        <h2>Sound</h2>
      </div>
      <div className="flex flex-row justify-between">
        <span>Alarm Sound</span>
        <div className="flex flex-col ">
          <select
            className="bg-gray-200 p-1 rounded-sm"
            value={selectedAlarm}
            onChange={handleAlarmChange}>
            <option value={Kitchen}>Kitchen</option>
            <option value={Bell}>Bell</option>
            <option value={Bird}>Bird</option>
            <option value={Wood}>Wood</option>
            <option value={Digital}>Digital</option>
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
