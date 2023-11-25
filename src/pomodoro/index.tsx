// Index.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { SelectedPage } from "@/shared/types";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useTimerContext } from "@/components/PomoTimerContext";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Index: React.FC<Props> = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // Set the initial time
  const { timerValue } = useTimerContext();
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-row m-2 items-center gap-4">{timerValue}</div>
    </div>
  );
};

export default Index;
