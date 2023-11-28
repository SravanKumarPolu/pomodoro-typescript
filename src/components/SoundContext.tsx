// SoundContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type SoundContextProps = {
  selectedAlarm: string;
  setSelectedAlarm: Dispatch<SetStateAction<string>>;
};

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

type SoundProviderProps = {
  children: ReactNode;
};

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [selectedAlarm, setSelectedAlarm] = useState<string>("");

  const contextValue: SoundContextProps = {
    selectedAlarm,
    setSelectedAlarm,
  };

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};
