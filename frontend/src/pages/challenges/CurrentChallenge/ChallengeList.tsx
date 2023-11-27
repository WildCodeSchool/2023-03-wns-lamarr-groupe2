import { Challenge } from "./Challenge";
import { useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";
import { timeLeft } from "./time";
import useUserContext from "../../../features/contexts/UserContext";
import useChallengeContext from "../../../features/contexts/ChallengeContext";
import { TChallenge } from "../../../features/contexts/utils/types";

const ChallengeList = () => {
  const { user } = useUserContext();
  const { challenges } = useChallengeContext();

  //Sort challenges

  const sortedChallenges: TChallenge[] = useMemo(() => {
    return pipe(
      challenges,
      filter((challenge: TChallenge) => {
        const contenders = challenge.contenders || [];
        return (
          timeLeft(challenge.startAt, challenge.endAt) > 1 &&
          contenders.some((contender) => contender.id === user.id)
        );
      }),
      sortBy((challenge) => challenge?.creator?.id !== user?.id)
    );
  }, [user, challenges]);

  return (
    <div className="h-full flex flex-col justify-around gap-4">
      {sortedChallenges
        ? sortedChallenges
            ?.slice(0, 3)
            ?.map((challenge, index) => (
              <Challenge key={challenge.id} challenge={challenge} />
            ))
        : "Aucun challenge"}
    </div>
  );
};

export default ChallengeList;
