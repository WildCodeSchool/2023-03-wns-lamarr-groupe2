import { FC, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChallengeList from "../challenges/CurrentChallenge/ChallengeList";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";

const MyChallenges: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();
  const { myChallenges, challenges } = useChallengeContext();

  const myChallengesList = challenges.filter((challenge) =>
    myChallenges.some(
      (myChallenge) => myChallenge.challenge.id === challenge.id
    )
  );

  const [isFiltered, setIsFiltered] = useState(
    myChallengesList.length === 0 ? false : true
  );

  return (
    <div className="h-full flex flex-col  w-full">
      <div className="py-8">
        <BtnCustom
          addMode
          onClick={() => navigate("/challenges/creation")}
          styled="btnAttention"
          text="Créer un challenge"
        />
      </div>
      <div className="flex gap-3 items-center w-full justify-start mb-2">
        <button
          onClick={() => setIsFiltered(true)}
          className={`${
            isFiltered ? "text-primary-good" : "text-tertiary-dark"
          }`}
        >
          Mes Challenges
        </button>
        <button
          onClick={() => setIsFiltered(false)}
          className={`${
            isFiltered ? "text-tertiary-dark" : "text-primary-good"
          }`}
        >
          Tendances
        </button>
      </div>

      <ChallengeList isFiltered={isFiltered} />
    </div>
  );
};

export default MyChallenges;
