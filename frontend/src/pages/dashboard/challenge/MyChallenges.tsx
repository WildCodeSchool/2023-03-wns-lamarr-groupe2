import { FC, PropsWithChildren } from "react";
import { Challenge, TChallenge } from "./Challenge";
import AddBtn from "../../../components/AddBtn";
import { challenges } from "./data";
import { useNavigate } from "react-router-dom";

const MyChallenges: FC<PropsWithChildren> = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col w-full">
      <h3 className="flex gap-4 mb-4">MES CHALLENGES<AddBtn onClick={() => navigate("/challenges/creation")} /></h3>
      <div className="h-full flex flex-col justify-around gap-4">
        {challenges ? challenges?.slice(0, 3)?.map((challenge, index) => <Challenge key={index} challenge={challenge} />) : 'Aucun challenge'}
      </div>
    </div>
  );
};

export default MyChallenges;
