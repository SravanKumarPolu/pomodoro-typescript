import Bird from "@/assets/bird.mp3";
import Wood from "@/assets/wood.mp3";
import Digital from "@/assets/digital.mp3";
import Bell from "@/assets/pomo-to-short.mp3";
import Kitchen from "@/assets/long-to-pomodoro.mp3";
import TickingFast from "@/assets/ticking-fast.mp3";
import TickingSlow from "@/assets/ticking-slow.mp3";
import BrownNoise from "@/assets/brown.mp3";
import WhiteNoise from "@/assets/white.mp3";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const alarmOptions = [
  { label: "Kitchen", value: Kitchen },
  { label: "Bird", value: Bird },
  { label: "Wood", value: Wood },
  { label: "Bell", value: Bell },
  { label: "Digital", value: Digital },
];
const tickingOptions = [
  { label: "None", value: "" },
  { label: "TickingFast", value: TickingFast },
  { label: "TickingSlow", value: TickingSlow },
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

  setTicking: (alarm: string) => void;
  tickingOptions: { label: string; value: string }[];
};

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

type SoundProviderProps = {
  children: ReactNode;
};

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");

  const [selectedTicking, setSelectedTicking] = useState<string>("");

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
