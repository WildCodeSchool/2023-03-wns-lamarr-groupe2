import { useNavigate } from "react-router-dom";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";
import { Challenge } from "./CurrentChallenge/Challenge";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { challenges } = useChallengeContext();

  return (
    <div>
      <h3 className="flex items-center gap-4 mb-4">
        EN COURS :
        <BtnCustom
          addMode
          text="Challenge"
          styled="btnAttention"
          onClick={() => navigate("/challenges/creation")}
        />
      </h3>
      <div className="h-full flex flex-col justify-around gap-4">
        {challenges
          ? challenges?.map((challenge, index) => (
              <Challenge key={index} challenge={challenge} />
            ))
          : "Aucun challenge"}
      </div>
    </div>
  );
};

export default ChallengesPage;
