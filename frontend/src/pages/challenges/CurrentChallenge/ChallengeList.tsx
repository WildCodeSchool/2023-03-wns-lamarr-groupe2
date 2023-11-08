// import { challenges } from "./data";
import { Challenge } from "./Challenge";
import { useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";
import { timeLeft } from "./time";
import useUserContext from "../../../features/contexts/UserContext";
import useChallengeContext from "../../../features/contexts/ChallengeContext";
import { TChallenge } from "../../../features/contexts/utils/types";
import { Link } from "react-router-dom";

const ChallengeList = () => {
  // const userId = 1; // usercontext user.id
  const { user } = useUserContext();
  const { challenges } = useChallengeContext();

  // Sort User's challenges + Hurry > Hurry challenge
  const sortedChallenges: TChallenge[] = useMemo(() => {
    return pipe(
      challenges,
      filter((challenge) => timeLeft(challenge?.startAt, challenge?.endAt) > 1),
      // filter((challenge) => challenges[7].contenders.includes(user)),
      sortBy((challenge) => timeLeft(challenge?.startAt, challenge?.endAt)),
      sortBy((challenge) => challenge?.creator?.id !== user?.id)
    );
  }, [user?.id, challenges]);

  console.log(challenges[7]?.contenders?.includes(user));

  return (
    <div className="h-full flex flex-col  gap-4 w-full">
      {challenges
        ? sortedChallenges
          ?.slice(0, 3)
          ?.map((challenge, index) => (
            <Challenge key={index} challenge={challenge} />
          ))
        : "Aucun challenge"}
      {challenges?.length > 3 && <Link to="/challenges" className="text-tertiary-dark pt-2 text-main-p">
        voir plus
      </Link>}
    </div>
  );
};

export default ChallengeList;
