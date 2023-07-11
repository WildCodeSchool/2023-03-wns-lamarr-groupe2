import { FC } from "react";
import { ProgressionBar } from "../../components/ProgressionBar";
import NavBtn from "../../components/NavBtn";
export type EcoAction = {
  id: number,
  name: string,
  description: string,
  points: number,
  need_proof: boolean
}

export type Challenge = {
  id: number,
  name: string,
  actions: EcoAction[],
  startAt: string,
  endAt: string,
  challenge_status_id: number,
  creator: number
};

export const Challenge: FC<{ challenge: Challenge }> = ({ challenge }) => {
  const progress = 70
  return <div className="border-1 h-44 p-3 rounded-medium">
    <div className="flex justify-between">
      <h4 className="uppercase text-main-p font-bold">{challenge?.name}</h4>
      <NavBtn type="specific" link={`/challenge/${challenge?.id}`} />
    </div>
    <ProgressionBar value={70} />
    <p className="text-main-p my-2 text-primary-dark"> Nb d'éco-gestes : {challenge?.actions.length}</p>
    <p>date</p>

  </div>;
};
