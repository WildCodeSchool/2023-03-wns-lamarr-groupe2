import React, { FC, useEffect, useState } from "react";
import { formattedTimeLeft } from "../challenges/CurrentChallenge/time";
import { TChallenge } from "../../features/contexts/utils/types";

export const TimeLeft: FC<{ challenge: TChallenge }> = ({ challenge }) => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const timeLeft = formattedTimeLeft(challenge?.endAt);
  const colorIndicator = (timeLeft: any, type?: "clock") => {
    if (Object.keys(timeLeft)[0] === "done") {
      return type ? "done" : "text-black";
    }
    if (Object.keys(timeLeft)[0] === "H") {
      return type ? "danger" : "text-primary-danger";
    }
    if (Object.keys(timeLeft)[0] === "M") {
      return type ? "attention" : "text-primary-attention";
    }
    return type ? "good" : "text-primary-good";
  };

  useEffect(() => {
    const importImage = async () => {
      try {
        const image = await import(
          `../../assets/icons/clock/clock-${colorIndicator(
            timeLeft,
            "clock"
          )}.svg`
        );
        setUrl(image.default);
      } catch (error) {
        console.error(error);
      }
    };

    importImage();
  }, [timeLeft]);

  return (
    <span className={`${colorIndicator(timeLeft)} flex gap-3`}>
      <img src={url} alt="clock" />
      {Object.values(timeLeft)}
      {Object.keys(timeLeft)}
    </span>
  );
};
