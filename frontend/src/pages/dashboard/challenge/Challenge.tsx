import { FC, useEffect, useState } from "react";
import { ProgressionBar } from "../../../components/ProgressionBar";
import NavBtn from "../../../components/NavBtn";
import { calculateTimeLeft } from "./time";
export type EcoAction = {
  id: number,
  name: string,
  description: string,
  points: number,
  need_proof: boolean
}

export type TChallenge = {
  id: number,
  name: string,
  actions: EcoAction[],
  startAt: string,
  endAt: string,
  challenge_status_id: number,
  creator: number
};

export const Challenge: FC<{ challenge: TChallenge }> = ({ challenge }) => {
  const progress = 70 //TO-DO : Calculate progression (actions done / nbr of actions)

  const TimeLeft = () => {
    const timeLeft = calculateTimeLeft(challenge?.startAt, challenge?.endAt);
    const [url, setUrl] = useState<string | undefined>(undefined);

    const colorIndicator = (timeLeft: any, type?: 'clock') => {
      if (Object.keys(timeLeft)[0] === 'H') {
        return type ? 'danger' : 'text-primary-danger';
      }
      if (Object.keys(timeLeft)[0] === 'M') {
        return type ? 'attention' : 'text-primary-attention';
      }
      return type ? 'good' : 'text-primary-good';
    };

    useEffect(() => {
      const importImage = async () => {
        try {
          const image = await import(`../../../assets/icons/clock/clock-${colorIndicator(timeLeft, 'clock')}.svg`)
          setUrl(image.default);
        } catch (error) {
          console.error(error);
        }
      };

      importImage();
    }, [timeLeft]);

    return <span className={`${colorIndicator(timeLeft)} flex gap-3`}> <img src={url} alt='clock' /> {Object.values(timeLeft)} {Object.keys(timeLeft)} </span >;
  };

  return <div className="border-1 h-44 p-3 rounded-medium">
    <div className="flex justify-between">
      <h4 className="uppercase text-main-p font-bold">{challenge?.name}</h4>
      <NavBtn type="specific" link={`/challenges/${challenge?.id}`} />
    </div>
    <ProgressionBar value={progress} />
    <p className="text-main-p my-2 text-primary-dark"> Nb d'éco-gestes : {challenge?.actions.length}</p>
    <TimeLeft />

  </div>;
};
