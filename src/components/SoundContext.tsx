// SoundContext.tsx
import Bird from "@/assets/bird.mp3";
import Wood from "@/assets/wood.mp3";
import Digital from "@/assets/digital.mp3";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the sound options
const soundOptions = [
  { label: "Bird", value: Bird },
  { label: "Wood", value: Wood },
  { label: "Digital", value: Digital },
  // Add more options as needed
];

type SoundContextProps = {
  selectedAlarm: string;
  selectedSound: string; // Update this to be the key of the selected sound, not the URL
  setSelectedAlarm: Dispatch<SetStateAction<string>>;
  setSelectedSound: Dispatch<SetStateAction<string>>;
  setAlarm: (alarm: string) => void;
  soundOptions: { label: string; value: string }[];
};

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

type SoundProviderProps = {
  children: ReactNode;
};

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");
  const [selectedSound, setSelectedSound] = useState<string>(""); // Update this to be the key of the selected sound, not the URL

  const setAlarm = (alarm: string) => {
    setSelectedAlarm(alarm);
  };

  const contextValue: SoundContextProps = {
    selectedAlarm,
    selectedSound,
    setSelectedAlarm,
    setSelectedSound,
    setAlarm,
    soundOptions,
  };

  return (
    <SoundContext.Provider value={contextValue}>
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
