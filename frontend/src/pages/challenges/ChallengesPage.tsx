import { useNavigate } from "react-router-dom";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";
import { Challenge } from "./CurrentChallenge/Challenge";
import { formattedTimeLeft } from "./CurrentChallenge/time";
import { useEffect } from "react";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const currentUser = 1; // UserContext user.id
  const { challenges, getEcoActionSelectionStatus, ecoActionSelectionStatus } =
    useChallengeContext();

  useEffect(() => {
    challenges.forEach((challenge) => {
      getEcoActionSelectionStatus(challenge.id);
    });
  }, [
    challenges,
    ecoActionSelectionStatus,
    currentUser,
    getEcoActionSelectionStatus,
  ]);
  // Calculate progress for each challenge
  const challengeWithProgress = challenges.map((challenge) => {
    // Calculate the percentage of progress
    const totalEcoActions = challenge.ecoActions.length;
    const selectedEcoActions = ecoActionSelectionStatus.filter(
      (status) => status.ecoActionIsSelected
    );
    const progressPercentage =
      (selectedEcoActions.length / totalEcoActions) * 100 || 0;

    return {
      challenge: challenge,
      progressPercentage,
    };
  });

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
              ? challengeWithProgress?.map((challenge, index) => {
                  const timeLeft = formattedTimeLeft(
                    challenge?.challenge.startAt,
                    challenge?.challenge.endAt
                  );

                  return (
                    !timeLeft.done && (
                      <Challenge key={index} challenge={challenge} />
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
              ? challengeWithProgress?.map((challenge, index) => {
                  const timeLeft = formattedTimeLeft(
                    challenge?.challenge.startAt,
                    challenge?.challenge.endAt
                  );

                  return (
                    timeLeft.done && (
                      <Challenge key={index} challenge={challenge} />
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
            ? challengeWithProgress?.map(
                (challenge, index) =>
                  challenge.challenge.creator.id !== currentUser && (
                    <Challenge key={index} challenge={challenge} />
                  )
              )
            : "Aucun challenge"}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
