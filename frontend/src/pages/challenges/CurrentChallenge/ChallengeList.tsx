import { Challenge } from "./Challenge";
import { useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";
import { timeLeft } from "./time";
import useUserContext from "../../../features/contexts/UserContext";
import useChallengeContext from "../../../features/contexts/ChallengeContext";
import { TChallenge } from "../../../features/contexts/utils/types";

const ChallengeList = () => {
  const { user } = useUserContext();
  const { myChallenges, challenges } = useChallengeContext();

  //Sort challenges
  const myChallengesList = challenges.filter((challenge) =>
    myChallenges.some(
      (myChallenge) => myChallenge.challenge.id === challenge.id
    )
  );
  const sortedChallenges: TChallenge[] = useMemo(() => {
    return pipe(
      myChallengesList,
      filter((challenge: TChallenge) => {
        return timeLeft(challenge.endAt) > 1;
      }),
      sortBy((challenge) => challenge?.creator?.id !== user?.id),
      sortBy((challenge) => new Date(challenge.endAt).getTime())
    );
  }, [user, myChallengesList]);

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
