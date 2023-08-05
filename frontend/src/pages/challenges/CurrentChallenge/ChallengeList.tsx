import { challenges } from "./data";
import { Challenge, TChallenge } from "./Challenge";
import { useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";
import { timeLeft } from "./time";

const ChallengeList = () => {
  const userId = 1; // usercontext user.id

  // Sort User's challenges + Hurry > Hurry challenge
  const sortedChallenges: TChallenge[] = useMemo(() => {
    return pipe(
      challenges,
      filter((challenge) => timeLeft(challenge?.startAt, challenge?.endAt) > 1),
      sortBy((challenge) => timeLeft(challenge?.startAt, challenge?.endAt)),
      sortBy((challenge) => challenge?.creator !== userId)
    );
  }, [userId]);

  return (
    <div className="h-full flex flex-col justify-around gap-4">
      {challenges
        ? sortedChallenges
          ?.slice(0, 3)
          ?.map((challenge, index) => (
            <Challenge key={index} challenge={challenge} />
          ))
        : "Aucun challenge"}
    </div>
  );
};

export default ChallengeList;
