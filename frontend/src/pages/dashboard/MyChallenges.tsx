import { FC, PropsWithChildren, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChallengeList from "../challenges/CurrentChallenge/ChallengeList";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";

const MyChallenges: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();
  const [isFiletered, setIsFiltered] = useState(false);
  const { challenges } = useChallengeContext()

  return (
    <div className="h-full flex flex-col  w-full">
      <div className="py-8">
        <BtnCustom addMode onClick={() => navigate("/challenges/creation")} styled="btnAttention" text="Créer un challenge" />
      </div>
      <div className="flex gap-3 items-center w-full justify-start mb-2">
        <button
          onClick={() => setIsFiltered(false)}
          className={`${isFiletered ? "text-tertiary-dark" : "text-primary-good"
            }`}
        >
          Tendances
        </button>
        <button
          onClick={() => setIsFiltered(true)}
          className={`${isFiletered ? "text-primary-good" : "text-tertiary-dark"
            }`}
        >
          Mes Challenges
        </button>
      </div>

      <ChallengeList />
      {challenges?.length > 3 && <Link to="/challenges" className="text-tertiary-dark pt-2 text-main-p">
        voir plus
      </Link>}
    </div>
  );
};

export default MyChallenges;
