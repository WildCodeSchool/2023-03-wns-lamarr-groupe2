import { Challenge } from "./Challenge";
import { useMemo } from "react";
import { filter, pipe, sortBy } from "remeda";
import { timeLeft } from "./time";
import useUserContext from "../../../features/contexts/UserContext";
import useChallengeContext from "../../../features/contexts/ChallengeContext";
import { TChallenge } from "../../../features/contexts/utils/types";
import { Link } from "react-router-dom";

const ChallengeList: React.FC<{ isFiltered: boolean }> = ({ isFiltered }) => {
  const { user } = useUserContext();
  const { myChallenges, challenges } = useChallengeContext();

  const otherChallenges = useMemo(() => {
    return pipe(
      challenges,
      filter(
        (challenge) =>
          !myChallenges.some(
            (myChallenge) => myChallenge.challenge.id === challenge.id
          )
      ),
      sortBy((challenge) => new Date(challenge.endAt).getTime())
    );
  }, [challenges, myChallenges]);

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

  const displayMyChallengesList = (
    <div className="h-full flex flex-col  gap-4 w-full">
      {sortedChallenges.length > 0 ? (
        sortedChallenges
          ?.slice(0, 3)
          ?.map((challenge, index) => (
            <Challenge key={challenge.id} challenge={challenge} />
          ))
      ) : (
        <p className="text-main-p my-2 text-primary-dark h-40	">
          Aucun Challenge
        </p>
      )}
      {challenges?.length > 3 && myChallenges.length !== 0 && (
        <Link to="/challenges" className="text-tertiary-dark pt-2 text-main-p">
          voir plus
        </Link>
      )}
    </div>
  );

  const displayTendencies = (
    <div className="h-full flex flex-col  gap-4 w-full">
      {otherChallenges.length > 0 ? (
        otherChallenges
          ?.slice(0, 3)
          ?.map((challenge, index) => (
            <Challenge key={challenge.id} challenge={challenge} />
          ))
      ) : (
        <p className="text-main-p my-2 text-primary-dark h-40	">
          Vous participez à l'ensemble des challenges
        </p>
      )}
    </div>
  );
  return isFiltered ? displayMyChallengesList : displayTendencies;
};

export default ChallengeList;
