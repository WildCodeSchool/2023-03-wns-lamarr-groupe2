// import { challenges } from "./data";
import { Challenge } from "./Challenge";
import { useEffect, useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";
import { timeLeft } from "./time";
import useUserContext from "../../../features/contexts/UserContext";
import useChallengeContext from "../../../features/contexts/ChallengeContext";
import { TChallenge } from "../../../features/contexts/utils/types";

const ChallengeList = () => {
  // const userId = 1; // usercontext user.id
  const { user } = useUserContext();
  const { challenges, getEcoActionSelectionStatus, ecoActionSelectionStatus } =
    useChallengeContext();

  useEffect(() => {
    challenges?.forEach((challenge) => {
      getEcoActionSelectionStatus(challenge.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenges, ecoActionSelectionStatus, user]);

  // Calculate progress for each challenge
  const challengesWithProgress = useMemo(() => {
    return challenges.map((challenge) => {
      // Calculate the percentage of progress
      const totalEcoActions = challenge.ecoActions.length;
      const selectedEcoActions = ecoActionSelectionStatus.filter(
        (status) => status.ecoActionIsSelected
      );
      const progressPercentage = Math.round(
        (selectedEcoActions.length / totalEcoActions) * 100
      );

      return {
        challenge: challenge,
        progressPercentage,
      };
    });
  }, [challenges, ecoActionSelectionStatus]);

  // Sort User's challenges + Hurry > Hurry challenge
  const sortedChallenges: {
    challenge: TChallenge;
    progressPercentage: number;
  }[] = useMemo(() => {
    return pipe(
      challengesWithProgress,
      filter(
        (challenge) =>
          timeLeft(challenge?.challenge.startAt, challenge?.challenge.endAt) > 1
      ),
      // filter((challenge) =>
      //   challenge.contenders.includes(user)
      // ),
      sortBy((challenge) =>
        timeLeft(challenge?.challenge.startAt, challenge?.challenge.endAt)
      ),
      sortBy((challenge) => challenge?.challenge.creator?.id !== user?.id)
    );
  }, [user, challengesWithProgress]);

  return (
    <div className="h-full flex flex-col justify-around gap-4">
      {challenges
        ? sortedChallenges
            ?.slice(0, 3)
            ?.map((challenge, index) => (
              <Challenge key={challenge.challenge.id} challenge={challenge} />
            ))
        : "Aucun challenge"}
    </div>
  );
};

export default ChallengeList;
