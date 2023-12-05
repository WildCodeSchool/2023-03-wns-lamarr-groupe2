import { useNavigate } from "react-router-dom";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";
import { Challenge } from "./CurrentChallenge/Challenge";
import { formattedTimeLeft } from "./CurrentChallenge/time";
import { TChallenge } from "../../features/contexts/utils/types";
import { useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const { myChallenges, challenges } = useChallengeContext();

  const myChallengesList = useMemo(() => {
    return pipe(
      challenges,
      filter((challenge) =>
        myChallenges.some(
          (myChallenge) => myChallenge.challenge.id === challenge.id
        )
      ),
      sortBy((challenge) => new Date(challenge.endAt).getTime())
    );
  }, [challenges, myChallenges]);

  const isChallengeDone = (challenge: TChallenge) => {
    const timeLeft = formattedTimeLeft(challenge?.endAt);
    return timeLeft.done;
  };

  return (
    <div className="mainScreen">
      <div className="w-full">
        <div className="flex flex-row w-full">
          <div className="w-full">
            <h3 className="flex items-center gap-4 mb-4">
              <div className="w-full flex justify-center md:block">
                <BtnCustom
                  addMode
                  text="Créer un challenge"
                  styled="btnAttention"
                  onClick={() => navigate("/challenges/creation")}
                />
              </div>
            </h3>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 py-8">
              {challenges ? (
                <>
                  {myChallengesList.map(
                    (challenge, index) =>
                      !isChallengeDone(challenge) && (
                        <Challenge key={index} challenge={challenge} />
                      )
                  )}
                  <h3 className="lg:hidden">Historique</h3>
                  {myChallengesList.map(
                    (challenge, index) =>
                      isChallengeDone(challenge) && (
                        <Challenge key={index} challenge={challenge} />
                      )
                  )}
                </>
              ) : (
                "Aucun challenge actuellement"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
