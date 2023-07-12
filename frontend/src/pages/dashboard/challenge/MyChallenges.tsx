import { FC, PropsWithChildren } from "react";
import { Challenge, TChallenge } from "./Challenge";
import AddBtn from "../../../components/AddBtn";
import { challenges } from "./data";

const MyChallenges: FC<PropsWithChildren> = () => {

  return (
    <div className="h-full flex flex-col w-full">
      <h3 className="flex gap-4 mb-4">MES CHALLENGES<AddBtn onClick={() => console.log('TO-DO : Add the add logic')} /></h3>
      <div className="h-full flex flex-col justify-around gap-4">
        {challenges ? challenges?.slice(0, 3)?.map((challenge, index) => <Challenge key={index} challenge={challenge} />) : 'Aucun challenge'}
      </div>
    </div>
  );
};

export default MyChallenges;
