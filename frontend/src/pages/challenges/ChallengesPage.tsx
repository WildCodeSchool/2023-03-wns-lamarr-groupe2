import { useNavigate } from "react-router-dom";
import BtnCustom from "../../components/BtnCustom";
import useChallengeContext from "../../features/contexts/ChallengeContext";
import { Challenge } from "./CurrentChallenge/Challenge";
import { formattedTimeLeft } from "./CurrentChallenge/time";
import { filter, pipe, sortBy } from "remeda";
import { useMemo } from "react";

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
            {myChallengesList
              ? myChallengesList?.map((challenge, index) => {
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
            {myChallengesList
              ? myChallengesList?.map((challenge, index) => {
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
          {otherChallenges.length > 0 ? (
            otherChallenges.map((challenge, index) => (
              <Challenge key={challenge.id} challenge={challenge} />
            ))
          ) : (
            <p className="text-main-p my-2 text-primary-dark h-40 bg-orange-600	">
              Vous participez à l'ensemble des challenges
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
