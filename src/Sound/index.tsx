import Bell from "@/assets/pomo-to-short.mp3";
import Kitchen from "@/assets/long-to-pomodoro.mp3";
import Bird from "@/assets/bird.mp3";
import Wood from "@/assets/wood.mp3";
import Digital from "@/assets/digital.mp3";
import SoundSvg from "@/assets/sound.svg";
import { useEffect, useState } from "react";
type Props = {};

const Sound = ({}: Props) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");
  const handleAlarmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlarm(event.target.value);
  };
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
      audio.src = selectedAlarm;
      audio.play();
    }
  }, [selectedAlarm, audio]);
  return (
    <div className="w-[20rem]  p-2 border-b-2 border-white-500">
      <div className="flex flex-row">
        <img src={SoundSvg} width={20} height={20} />
        <h2>Sound</h2>
      </div>
      <div className="flex flex-row justify-between">
        <span>Alarm Sound</span>
        <div className="flex flex-col">
          <select
            id="alarm"
            className="bg-gray-200 p-1 rounded-sm"
            value={selectedAlarm}
            onChange={handleAlarmChange}>
            <option value={Kitchen}>Kitchen</option>
            <option value={Bell}>Bell</option>
            <option value={Bird}>Bird</option>
            <option value={Wood}>Wood</option>
            <option value={Digital}>Digital</option>
          </select>
          <div>Sound</div>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
};

export default Sound;
