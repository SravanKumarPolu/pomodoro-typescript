import React, { useEffect, useState } from "react";

const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateLiveTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(timeString);
    };

    const intervalId = setInterval(updateLiveTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <span>{currentTime}</span>;
};

export default LiveTime;
