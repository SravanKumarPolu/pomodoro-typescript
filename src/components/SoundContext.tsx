import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Import your mp3 files

import Wood from "@/assets/wood.mp3";
import Digital from "@/assets/digital.mp3";
import Bell from "@/assets/pomo-to-short.mp3";
import Kitchen from "@/assets/long-to-pomodoro.mp3";
import TickingFast from "@/assets/ticking-fast.mp3";
import TickingSlow from "@/assets/ticking-slow.mp3";
import BrownNoise from "@/assets/brown.mp3";
import WhiteNoise from "@/assets/white.mp3";
import AlarmTone from "@/assets/AlarmTone.mp3";
import WakeUp from "@/assets/WakeUp.mp3";
import CuckooChimes from "@/assets/cuckoo-chimes.mp3";
import TickleBuzzer from "@/assets/tickingbuzzer.mp3";
import TickleTension from "@/assets/ticking-tension.mp3";
import BackTickle from "@/assets/backmusic.mp3";

const alarmOptions = [
  { label: "Kitchen", value: Kitchen },
  { label: "Alarm-Tone", value: AlarmTone },
  { label: "WakeUp", value: WakeUp },
  { label: "Cuckoo-Chimes", value: CuckooChimes },
  { label: "Wood", value: Wood },
  { label: "Bell", value: Bell },
  { label: "Digital", value: Digital },
];

const tickingOptions = [
  { label: "None", value: "" },
  { label: "TickingFast", value: TickingFast },
  { label: "TickingSlow", value: TickingSlow },
  { label: "Ticking-Tension", value: TickleTension },
  { label: "Ticking-Buzzer", value: TickleBuzzer },
  { label: "Back-Tickle", value: BackTickle },
  { label: "BrownNoise", value: BrownNoise },
  { label: "WhiteNoise", value: WhiteNoise },
];

type SoundContextProps = {
  selectedAlarm: string;
  setSelectedAlarm: Dispatch<SetStateAction<string>>;
  setAlarm: (alarm: string) => void;
  alarmOptions: { label: string; value: string }[];
  selectedTicking: string;
  setSelectedTicking: Dispatch<SetStateAction<string>>;
  setTicking: (ticking: string) => void;
  tickingOptions: { label: string; value: string }[];
  audioVolume1: number;
  setAudioVolume1: (volume: number) => void;
  audioVolume2: number;
  setAudioVolume2: (volume: number) => void;
};

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

type SoundProviderProps = {
  children: ReactNode;
};

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [selectedAlarm, setSelectedAlarm] = useState<string>(Kitchen);
  const [selectedTicking, setSelectedTicking] = useState<string>("");
  const [audioVolume1, setAudioVolume1] = useState<number>(0.5);
  const [audioVolume2, setAudioVolume2] = useState<number>(0.5);
  const setAlarm = (alarm: string) => {
    setSelectedAlarm(alarm);
  };

  const setTicking = (ticking: string) => {
    setSelectedTicking(ticking);
  };

  const contextValue: SoundContextProps = {
    selectedAlarm,
    setSelectedAlarm,
    setAlarm,
    alarmOptions,
    selectedTicking,
    setSelectedTicking,
    setTicking,
    audioVolume1,
    setAudioVolume1,
    audioVolume2,
    setAudioVolume2,
    tickingOptions,
  };

  return (
    <SoundContext.Provider value={{ ...contextValue }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = (): SoundContextProps => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
