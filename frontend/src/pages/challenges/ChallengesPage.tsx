import { useNavigate } from "react-router-dom";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";
import { Challenge } from "./CurrentChallenge/Challenge";
import { formattedTimeLeft } from "./CurrentChallenge/time";
import useUserContext from "../../features/contexts/UserContext";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const user = useUserContext();
  const { challenges } = useChallengeContext();

  // Calculate progress for each challenge

  return (
    <div className="w-full">
      <div className="flex flex-row w-full">
        <div className="w-2/3 p-4">
          <h3 className="flex items-center gap-4 mb-4">
            EN COURS :
            <BtnCustom
              addMode
              text="Challenge"
              styled="btnAttention"
              onClick={() => navigate("/challenges/creation")}
            />
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {challenges
              ? challenges?.map((challenge, index) => {
                  const timeLeft = formattedTimeLeft(
                    challenge?.startAt,
                    challenge?.endAt
                  );

                  return (
                    !timeLeft.done && (
                      <Challenge key={challenge.id} challenge={challenge} />
                    )
                  );
                })
              : "Aucun challenge"}
          </div>
        </div>
        <div className="w-1/3 p-4">
          <h3 className="flex items-center gap-4 mb-6">Historique :</h3>
          <div className="flex flex-col gap-4">
            {challenges
              ? challenges?.map((challenge, index) => {
                  const timeLeft = formattedTimeLeft(
                    challenge?.startAt,
                    challenge?.endAt
                  );

                  return (
                    timeLeft.done && (
                      <Challenge key={challenge.id} challenge={challenge} />
                    )
                  );
                })
              : "Aucun challenge"}
          </div>
        </div>
      </div>
      <div className="w-full">
        <h3 className="flex items-center gap-4 mt-4">TENDANCES :</h3>
        <div className="w-full flex flex-row gap-4 overflow-x-auto">
          {challenges
            ? challenges?.map(
                (challenge, index) =>
                  challenge.creator.id !== user.user.id && (
                    <Challenge key={challenge.id} challenge={challenge} />
                  )
              )
            : "Aucun challenge"}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
